import React, { useState } from "react";
import WidgetsTrends from "../WidgetsTrends/WidgetsTrends";
import SearchWidget from "../../elements/SearchWidget/SearchWidget";

import "./Widgets.css";

const Widgets = () => {
  const [text, setText] = useState("");
  return (
    <div className="widgets">
      <SearchWidget
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={() => setText("")}
        placeholder="Search twitter"
      />

      <WidgetsTrends />
    </div>
  );
};

export default Widgets;
