import React, { useState } from "react";
import "./loginPage.css";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../../features/auth/authSlice";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginWithEmail = async () => {
    if (phone !== "" && password !== "") {
      setLoading(true);
      await dispatch(login({ phone, password }));
      toast.success("Login successfully");
      navigate("/");
    } else {
      toast.error("Please Enter Email and Password");
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/");
  };
  const signUpWithEmail = async () => {
    if (
      name !== "" &&
      phone !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setLoading(true);
      if (password === confirmPassword) {
        await dispatch(register({ name, phone, password }));
        toast.success("user created successfully!");
        setLoading(false);
        navigate("/");
        setName("");
        setPhone("");
        setConfirmPassword("");
        setPassword("");
      } else {
        toast.error("password and confirm password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are required!");
      setLoading(false);
    }
  };
  return (
    <div className="loginwrapper">
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span className="titles orangeText"> Digital Diner.</span>
          </h2>
          <form>
            <Input
              label="Phone"
              placeholder="942432056"
              state={phone}
              setState={setPhone}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Ajayq0832@#"
              state={password}
              setState={setPassword}
            />
            <Button
              handleClick={loginWithEmail}
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              className={"loginBtn"}
            />
            <p className="p-login" onClick={() => setLoginForm(false)}>
              or Don't Have An Account ? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on{" "}
            <span className="titles orangeText"> Digital Diner.</span>
          </h2>
          <form>
            <Input
              label="Full Name"
              placeholder="John Doe"
              state={name}
              setState={setName}
            />
            <Input
              label="Phone"
              placeholder="9876543210"
              state={phone}
              setState={setPhone}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Example@123"
              state={password}
              setState={setPassword}
            />
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Example@123"
              state={confirmPassword}
              setState={setConfirmPassword}
            />
            <Button
              handleClick={signUpWithEmail}
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              className={"loginBtn"}
            />
            <p className="p-login" onClick={() => setLoginForm(true)}>
              or Have An Account Already ? Click Here
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignupSigninComponent;
