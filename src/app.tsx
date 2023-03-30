import * as React from "react";
import "./app.scss";
import FormWrapper from "./containers/FormWrapper/FormWrapper";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <h1 className="visually-hidden" data-testid="main-title">
        Форма отправки данных
      </h1>
      <FormWrapper />
    </div>
  );
};

export default App;
