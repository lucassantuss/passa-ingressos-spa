import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Botao from "components/Botao";

import styles from "./AuthForm.module.css";

const AuthForm = ({ tipo }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (tipo === "login") {
          await signIn({ username: usuario, password: senha });
          window.location.href = "/eventos"; // Redireciona após o login bem-sucedido
        } 
        // else if (tipo === "esqueci-senha") {
        //   // Chama a API para redefinir a senha
        //   await api.put("Acesso/RedefinirSenha", {
        //     login: usuario,
        //     senha: senha,
        //   });
        //   alert("Senha alterada com sucesso!");
        //   navigate("/login"); // Redireciona para a página de login
        // }
      } catch (error) {
        if (tipo === "login") {
          alert("Login e/ou senha inválidos!");
        } else {
          alert("Erro ao redefinir a senha. Verifique os dados informados.");
        }
      }
    },
    [usuario, senha, signIn, tipo, navigate]
  );

  useEffect(() => {
    localStorage.removeItem("@PermissionPI:token");
  }, []);

  return (
    <div className={styles["auth-container"]}>
      <form className={styles["auth-box"]} onSubmit={handleSubmit}>
        {tipo === "login" && (
          <>
            <div className={styles["form-group"]}>
              <label>Usuário</label>
              <input
                type="text"
                value={usuario}
                placeholder="Digite seu usuário"
                onChange={(event) => setUsuario(event.target.value)}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                placeholder="Digite sua senha"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* {tipo === "esqueci-senha" && (
          <>
            <div className={styles["form-group"]}>
              <label>Usuário</label>
              <input
                type="text"
                value={usuario}
                placeholder="Digite seu usuário"
                onChange={(event) => setUsuario(event.target.value)}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Nova Senha</label>
              <input
                type="password"
                value={senha}
                placeholder="Digite a senha nova"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
          </>
        )} */}

        <div className={styles["form-group"]}>
          <Botao
            cn={styles.botao}
            conteudo={tipo === "login" ? "Entrar" : "Alterar Senha"}
          />
        </div>

        {tipo === "login" && (
          <div className={styles["form-actions"]}>
            <Link to="/criar-conta">
              <button type="button" className={styles.linkLeft}>
                Criar Conta
              </button>
            </Link>

            {/* <Link to="/esqueci-senha">
              <button type="button" className={styles.linkRight}>
                Esqueci minha senha
              </button>
            </Link> */}
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;