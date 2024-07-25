import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/">Fast React Pizza Co.</Link>
            <p>Delicious pizza delivered quickly!</p>
        </header>
    );
}