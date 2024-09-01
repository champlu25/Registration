import { useState, useRef } from "react";
import styles from "./registration.module.css";
import Field from "../Field/Field";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState("");

  const submitButtonRef = useRef(null);

  const sendData = (formData) => {
    console.log(formData);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendData({ email, password, repeatedPassword });
  };

  const onEmailChange = ({ target }) => {
    setEmail(target.value);

    let error = null;

    if (target.value.length > 50) {
      error = "Неверный email. Не может быть больше 50 символов.";
    }

    setEmailError(error);
  };

  const onEmailBlur = ({ target }) => {
    let error = null;

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)
    ) {
      error = "Неверный email. Проверьте правильность введения почты.";
    } else if (target.value.length < 6) {
      error = "Неверный email. Должно быть не меньше 6 символов.";
    }

    setEmailError(error);
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);

    setPasswordError(null);
  };

  const onBlurPassword = ({ target }) => {
    let error = null;

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(
        target.value
      )
    ) {
      error =
        "Пароль должен содержать хотя бы одну букву, одну цифру и один специальный символ.";
    } else if (target.value.length < 8) {
      error = "Неверный пароль. Должно быть не меньше 8 символов.";
    } else if (target.value.length > 25) {
      error = "Неверный пароль. Должно быть не больше 25 символов.";
    }

    setPasswordError(error);
    if (target.value !== repeatedPassword && repeatedPassword !== "") {
      setRepeatedPasswordError("Пароли не совпадают.");
    }
  };

  const onRepeatedPasswordChange = ({ target }) => {
    setRepeatedPassword(target.value);
    setRepeatedPasswordError(null);
  };

  const onBlurRepeatedPassword = ({ target }) => {
    if (target.value !== password) {
      setRepeatedPasswordError("Пароли не совпадают.");
    } else {
      submitButtonRef.current.focus();
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit}>
          {emailError && <div className={styles.errorLabel}>{emailError}</div>}
          <Field
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onEmailChange}
            onBlur={onEmailBlur}
          />
          {passwordError && (
            <div className={styles.errorLabel}>{passwordError}</div>
          )}
          <Field
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            onChange={onPasswordChange}
            onBlur={onBlurPassword}
          />
          {repeatedPasswordError && (
            <div className={styles.errorLabel}>{repeatedPasswordError}</div>
          )}
          <Field
            type="password"
            name="repeatedPassword"
            value={repeatedPassword}
            placeholder="Повторите пароль"
            onChange={onRepeatedPasswordChange}
            onBlur={onBlurRepeatedPassword}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={emailError || passwordError || repeatedPasswordError}
            ref={submitButtonRef}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;
