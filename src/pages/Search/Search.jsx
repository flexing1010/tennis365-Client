import { useLocation } from "react-router-dom";
import DisplayItem from "../../components/DisplayItem/DisplayItem";

const Search = () => {
  const location = useLocation();
  const results = location.state.searchResult;
  return (
    <section className="search" style={{ margin: "0 auto" }}>
      <DisplayItem items={results} />
    </section>
  );
};

export default Search;
