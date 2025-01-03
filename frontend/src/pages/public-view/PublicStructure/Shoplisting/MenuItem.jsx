import { Label } from "@/components/ui/label"
import { ShopingList } from "@/utils/DummyData/AddProductsData"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const MenuItem = ({ menuItmeClose }) => {
  const [searchParams, setsearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handelMenuItem = (menuLabel) => {
    localStorage.removeItem("filter");

    const currentLabel =
      menuLabel.id !== "home" && menuLabel.id !== "products"
        ? {
            category: [menuLabel?.id],
          }
        : null;

    localStorage.setItem("filter", JSON.stringify(currentLabel));
    location.pathname.includes("listing") && currentLabel !== null
      ? setsearchParams(new URLSearchParams(`?category=${menuLabel.id}`))
      : navigate(menuLabel.path);

      if(menuItmeClose){
        menuItmeClose()
      }
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {ShopingList.map((menu) => (
        <Label
          onClick={() => {
            handelMenuItem(menu);
          }}
          className="text-sm font-medium cursor-pointer"
          key={menu.id}
        >
          {menu.label}
        </Label>
      ))}
    </nav>
  );
};

export default MenuItem
