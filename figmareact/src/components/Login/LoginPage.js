import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlinePassword, MdPerson } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import logoImage from "../images/logo (1).png";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      // Axios normaliza cabeçalhos para minúsculas
      const authHeader =
        response.headers["authorization"] || response.headers["Authorization"];
      if (!authHeader) throw new Error("Authorization header ausente");

      // Pega apenas o JWT (sem o "Bearer ")
      const jwt = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      // Decodifica o token para obter o jti (id do usuário)
      const decoded = jwtDecode(jwt);

      // Guarde o header completo (com "Bearer ...") para o interceptor enviar depois
      if (rememberMeChecked) {
        localStorage.setItem("authToken", authHeader);
      } else {
        localStorage.setItem("authToken", authHeader);
      }
      localStorage.setItem("isAuthenticated", "true");

      // Busca o usuário para decidir o redirecionamento
      const userResponse = await api.get(`/user/${decoded.jti}`);
      const user = userResponse.data;

      if (String(user.profile).includes("ADM")) {
        navigate("/menuassistente", { replace: true });
      } else if (String(user.profile).includes("SECRETARIA")) {
        navigate("/menusecretaria", { replace: true });
      } else if (String(user.profile).includes("OUTROS")) {
        navigate("/menuoutros", { replace: true });
      } else if (String(user.profile).includes("ASSISTENTE")) {
        navigate("/assistente", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Usuário ou senha inválidos.");
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <aside className={styles.sidebar}>
          <img src={logoImage} alt="Department Logo" className={styles.logo} />
          <h2 className={styles.departmentName}>
            Secretaria de Assistência Social
          </h2>
        </aside>
        <section className={styles.mainContent}>
          <h1 className={styles.formTitle}>Insira seus dados</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <MdPerson className={styles.inputIcon} />
              <label htmlFor="login" className={styles.visuallyHidden}></label>
              <input
                id="login"
                type="text"
                className={styles.input}
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <MdOutlinePassword className={styles.inputIcon} />
              <label
                htmlFor="password"
                className={styles.visuallyHidden}
              ></label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={styles.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMeChecked}
                onChange={(e) => setRememberMeChecked(e.target.checked)}
              />
              <label htmlFor="rememberMe">Lembrar de mim</label>
            </div>

            {errorMessage && (
              <p className={styles.errorAlert}>{errorMessage}</p>
            )}
            <button type="submit" className={styles.submitButton}>
              ENTRAR
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
