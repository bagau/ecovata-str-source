import React from "react";
import { Link } from "gatsby";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <header
        style={{
          borderBottom: "1px solid #ccc",
          marginBottom: "2rem",
          paddingBottom: "1rem",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: "#333",
            }}
          >
            Эковата-Стр
          </Link>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#666" }}>
              Главная
            </Link>
            <Link
              to="/cat/stati/"
              style={{ textDecoration: "none", color: "#666" }}
            >
              Статьи
            </Link>
            <Link
              to="/cat/nashi-raboty/"
              style={{ textDecoration: "none", color: "#666" }}
            >
              Наши работы
            </Link>
            <Link
              to="/contacts"
              style={{ textDecoration: "none", color: "#666" }}
            >
              Контакты
            </Link>
          </div>
        </nav>
        {title && <h1 style={{ margin: "1rem 0 0 0" }}>{title}</h1>}
      </header>

      <main>{children}</main>

      <footer
        style={{
          borderTop: "1px solid #ccc",
          marginTop: "3rem",
          paddingTop: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              color: "#2c3e50",
              fontWeight: "bold",
            }}
          >
            Нужно утепление дома эковатой?
          </div>
          <div
            style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#e74c3c" }}
          >
            +7 (917) 428-37-07, +7 (962) 526-70-25
          </div>
        </div>

        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          © 2012-2025. Утепление эковатой в Стерлитамаке и Башкирии. Мы работаем
          для тепла вашего дома!
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <Link
            to="/vse_stati/"
            style={{
              color: "#3498db",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Все статьи
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
