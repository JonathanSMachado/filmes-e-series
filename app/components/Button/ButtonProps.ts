import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  to?: string; // Se presente, vira um Link
  isLoading?: boolean; // Ativa o estado de carregamento
  icon?: ReactNode; // Ícone à esquerda
  iconRight?: ReactNode; // Ícone à direita
}
