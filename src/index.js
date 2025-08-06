import "./style.css";
import HomeView from "./views/home-view";

const root = document.getElementById("root");

const homeView = new HomeView(root);
homeView.render();
