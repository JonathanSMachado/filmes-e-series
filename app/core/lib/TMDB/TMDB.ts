import { getEnv } from "~/utils/env.server";
import { getVideoBaseUrl } from "~/utils/helpers";
import { slugify } from "~/utils/string-helpers";
import type {
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  TMDBResponseItem,
  TMDBResponseItemDetails,
  TMDBResponseVideo,
  TMDBVideo,
} from "./types";

export class TMDB {
  TYPES = ["movie", "tv"];
  POSTER_URL: string;
  BACKDROP_URL: string;

  constructor() {
    const env = getEnv();
    this.POSTER_URL = env.TMDB_POSTER_IMAGES_URL;
    this.BACKDROP_URL = env.TMDB_BACKDROP_IMAGES_URL;
  }

  async getMostPopular({
    type,
    page,
  }: {
    type?: string;
    page?: number;
  }): Promise<TMDBItem[]> {
    try {
      let items: TMDBItem[] = [];

      if (type) {
        items = await this.fetchMostPopularByType(
          this.convertTypeToTMDBType(type),
          page ?? 1,
        );
      } else {
        for (const t of this.TYPES) {
          const fetchedItems = await this.fetchMostPopularByType(t, page ?? 1);
          items = [...items, ...fetchedItems];
        }
      }

      return items;
    } catch (error: any) {
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }

  async getTopRated({
    type,
    page,
  }: {
    type?: string;
    page?: number;
  }): Promise<TMDBItem[]> {
    try {
      let items: TMDBItem[] = [];

      if (type) {
        items = await this.fetchTopRatedItemsByType(
          this.convertTypeToTMDBType(type),
          page ?? 1,
        );
      } else {
        for (const itemType of this.TYPES) {
          const typeItems = await this.fetchTopRatedItemsByType(
            itemType,
            page ?? 1,
          );
          items = [...items, ...typeItems];
        }
      }

      return items;
    } catch (error: any) {
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }

  async getDetails({
    id,
    type,
  }: {
    id: number;
    type: string;
  }): Promise<TMDBItemDetails> {
    const itemId = id;

    try {
      const data = (await this.fetchData(
        `${this.convertTypeToTMDBType(type)}/${itemId}`,
        { appendVideos: true },
      )) as TMDBResponseItemDetails;

      const videos =
        data.videos?.results?.map((video: TMDBResponseVideo): TMDBVideo => {
          const { id, name, site, key, published_at, type, official } = video;
          const url =
            site && key ? `${getVideoBaseUrl(site)}${key}` : undefined;

          return {
            id,
            name,
            url,
            type,
            official,
            published_at,
          };
        }) ?? [];

      const {
        adult,
        backdrop_path,
        genres,
        homepage,
        id,
        overview,
        popularity,
        poster_path,
        title,
        name,
        vote_average,
        vote_count,
        release_date,
        first_air_date,
        number_of_episodes,
        number_of_seasons,
        tagLine,
        runtime,
      } = data;

      const mediaType = this.convertMediaType(title ? "movie" : "tv");

      return {
        adult,
        backdrop_path: backdrop_path ? this.BACKDROP_URL + backdrop_path : null,
        genres,
        homepage,
        id,
        overview,
        popularity,
        poster_path: poster_path ? this.POSTER_URL + poster_path : null,
        title: title || name || "",
        media_type_slug: slugify(mediaType),
        media_type: mediaType,
        vote_average,
        vote_count,
        release_date: release_date ?? first_air_date,
        number_of_episodes,
        number_of_seasons,
        tagLine,
        runtime,
        videos,
        recommendations: [],
      };
    } catch (error: any) {
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }

  async getRecommendations({
    type,
    id,
    page,
  }: {
    type: string;
    id: number;
    page?: number;
  }): Promise<TMDBItem[]> {
    try {
      const data = await this.fetchData(
        `${this.convertTypeToTMDBType(type)}/${id}/recommendations`,
        { page: page ?? 1 },
      );

      let results = (data as TMDBResponse).results;

      return results.map((item: any) => this.mapToTMDBItem(item, type));
    } catch (error: any) {
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }

  async getTrending({
    type,
    page,
    period,
  }: {
    type?: string;
    page?: number;
    period?: string | null;
  }): Promise<TMDBItem[]> {
    try {
      const trendingEndpoint = type
        ? `trending/${this.convertTypeToTMDBType(type)}/${period ?? "day"}`
        : `trending/all/${period ?? "day"}`;
      const data = await this.fetchData(trendingEndpoint, { page: page ?? 1 });

      let results = (data as TMDBResponse).results;

      return results.map((item: any) => this.mapToTMDBItem(item, type));
    } catch (error: any) {
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }

  async search({
    query,
    type,
    page,
  }: {
    query: string;
    type?: string;
    page?: number;
  }): Promise<TMDBItem[]> {
    try {
      if (type) {
        return await this.searchItemsByType(
          this.convertTypeToTMDBType(type),
          query,
          page ?? 1,
        );
      } else {
        let items: TMDBItem[] = [];
        for (const t of this.TYPES) {
          const fetchedItems = await this.searchItemsByType(
            this.convertTypeToTMDBType(t),
            query,
            page ?? 1,
          );
          items = [...items, ...fetchedItems];
        }

        return items;
      }
    } catch (error: any) {
      if (error instanceof Error) throw error;

      throw new Error(String(error));
    }
  }

  private async fetchMostPopularByType(
    type: string,
    page: number,
  ): Promise<TMDBItem[]> {
    const data = await this.fetchData(`${type}/popular`, { page });
    const results = (data as TMDBResponse).results;

    return results.map((item: TMDBResponseItem) =>
      this.mapToTMDBItem(item, type),
    );
  }

  private async fetchTopRatedItemsByType(
    type: string,
    page: number,
  ): Promise<TMDBItem[]> {
    const data = await this.fetchData(`${type}/top_rated`, { page });
    const results = (data as TMDBResponse).results;

    return results.map((item: TMDBResponseItem) =>
      this.mapToTMDBItem(item, type),
    );
  }

  private async searchItemsByType(
    type: string,
    query: string,
    page: number,
  ): Promise<TMDBItem[]> {
    const data = await this.fetchData(`search/${type}`, { query, page });
    const results = (data as TMDBResponse).results;

    return results.map((item: TMDBResponseItem) =>
      this.mapToTMDBItem(item, type),
    );
  }

  private async fetchData(
    endpoint: string,
    params?: {
      page?: number;
      query?: string;
      appendVideos?: boolean;
      includeAdult?: boolean;
    },
  ): Promise<TMDBResponse | TMDBResponseItemDetails> {
    const token = getEnv().TMDB_TOKEN;
    const baseUrl = getEnv().TMDB_API_URL;
    const queryParams = ["language=pt-BR"];

    if (params) {
      if (params.page) queryParams.push(`page=${params.page}`);
      if (params.query)
        queryParams.push(`query=${encodeURIComponent(params.query)}`);
      if (params.appendVideos) queryParams.push(`append_to_response=videos`);
      if (params.includeAdult) queryParams.push(`include_adult=true`);
    }

    const response = await fetch(
      `${baseUrl}/${endpoint}?${queryParams.join("&")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      throw new Error(`TMDB API error: ${response.status} ${text}`);
    }

    const data = await response.json();

    return data;
  }

  private convertTypeToTMDBType(type: string): string {
    const t = type.toLowerCase();
    if (t === "filmes" || t === "filme" || t === "movie" || t === "movies")
      return "movie";
    if (t === "series" || t === "séries" || t === "serie" || t === "tv")
      return "tv";
    throw new Error(`Tipo inválido: ${type}`);
  }

  private convertMediaType(type: string): "Filmes" | "Séries" {
    const mediaTypeMap: Record<string, "Filmes" | "Séries"> = {
      movie: "Filmes",
      tv: "Séries",
    };

    return mediaTypeMap[type.toLowerCase()] ?? "Filmes";
  }

  private mapToTMDBItem(item: TMDBResponseItem, type?: string): TMDBItem {
    const {
      id,
      title,
      name,
      adult = false,
      vote_average,
      poster_path,
      popularity,
      release_date,
      first_air_date,
      backdrop_path,
    } = item;

    const mediaType = type
      ? this.convertMediaType(type)
      : this.convertMediaType(title ? "movie" : "tv");

    const mediaTypeSlug = slugify(mediaType) as "filmes" | "series";

    return {
      id,
      title: title || name || "",
      adult,
      vote_average,
      poster_path: poster_path ? this.POSTER_URL + poster_path : null,
      media_type: mediaType,
      media_type_slug: mediaTypeSlug,
      popularity,
      release_date: release_date ?? first_air_date,
      backdrop_path: backdrop_path ? this.BACKDROP_URL + backdrop_path : null,
      link: `/${mediaTypeSlug}/${id}`,
    };
  }
}
