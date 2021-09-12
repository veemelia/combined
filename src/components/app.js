const Music = require("./music");
const Weather = require("./weather");

const App = () => {
  return (
    <main>
      <Weather />
      <Music />
    </main>
  );
};

module.exports = App;
