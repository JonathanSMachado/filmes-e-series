const getInputSearchPlaceholder = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Pesquisar filmes ou séries...";
    case "/catalogo":
      return "Pesquisar no catálogo...";
    default:
      return "Pesquisar...";
  }
};

export { getInputSearchPlaceholder };
