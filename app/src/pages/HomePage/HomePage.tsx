import Header from "@/components/shared/Header/Header";
import Offers from "@/components/shared/Offers/Offers";
import CategoryCards from "@/components/shared/CategoryCards/CategoryCards";
import ItemContainer from "@/components/shared/ItemContainer/ItemContainer";

const HomePage = () => {
  return (
    <main>
      <Header />
      <Offers />
      <CategoryCards />
      <ItemContainer />
    </main>
  );
};

export default HomePage;
