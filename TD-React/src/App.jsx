import { useState } from 'react'
import './App.css'
import image from './assets/UnivCote.png'
import data from './data.json';

function Header(){

    return(
        <header>
            <img src={image} style={{width:'30%',height:'10%'}} alt={"Université cote d'Azur"}/>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    )
}
function MainContent() {

    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return (
        <>
            <p>Ici, nous afficherons des informations intéressantes :)</p>
            <p>Bonjour, on est le {day}, {month}, {year} et il est {hour}:{minute}:{second}</p>
        </>
    );
}
function Footer() {
    const now = new Date();
    const year = now.getFullYear();

    return (
        <footer >

            <p>Tous droits réservés © {year} - Chafki Youness</p>
        </footer>
    );
}
function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

    const handleClick = (item) => {
        alert(`Vous avez cliqué sur : ${item}`);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const containerStyle = {
        position: "absolute",
        top: "10px",
        left: "10px",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const dropdownStyle = {
        display: isOpen ? "block" : "none",
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#7221ac",
        border: "1px solid #ddd",
        borderRadius: "5px",
        listStyleType: "none",
        position: "absolute",
        zIndex: 1000,
    };

    const menuItemStyle = {
        padding: "5px 10px",
        cursor: "pointer",
        fontSize: "16px",
    };

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} onClick={toggleDropdown}>
                Menu
            </button>
            <ul style={dropdownStyle}>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        style={menuItemStyle}
                        onClick={() => handleClick(item)}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#000000")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
function RandomItem() {
    const [item, setItem] = useState(getRandomItem(data));

    const handleRandomize = () => {
        const randomItem = getRandomItem(data);
        setItem(randomItem);
    };

    const containerStyle = {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
        maxWidth: "400px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
    };

    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: "#333",
    };

    const paragraphStyle = {
        fontSize: "16px",
        margin: "10px 0",
        color: "#555",
    };

    const buttonStyle = {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "15px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Information Aléatoire</h1>
            <p style={paragraphStyle}>
                <strong>Course:</strong> {item.course}
            </p>
            <p style={paragraphStyle}>
                <strong>Student:</strong> {item.student.firstname} {item.student.lastname}
            </p>
            <p style={paragraphStyle}>
                <strong>Date:</strong> {item.date}
            </p>
            <p style={paragraphStyle}>
                <strong>Grade:</strong> {item.grade}
            </p>
            <button
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                onClick={handleRandomize}
            >
                Tirer un autre élément
            </button>
        </div>
    );
}

function App() {

  return (
    <>
      <div>
          <DropdownMenu />
          <Header></Header>
          <MainContent></MainContent>
      </div>
        <RandomItem />
        <Footer></Footer>

    </>
  )
}

export default App
