import { useState, useEffect, useRef } from 'react';
import './App.css';
import image from './assets/UnivCote.png';
import data from './data.json';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Header() {
    return (
        <header>
            <img src={image} style={{ width: '30%', height: '10%' }} alt={"Université cote d'Azur"} />
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
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
        <footer>
            <p>Tous droits réservés © {year} - Chafki Youness</p>
        </footer>
    );
}

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [isTableVisible, setIsTableVisible] = useState(true);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

    const dataByMenu = {
        Notes: data.map((item) => ({
            id: item.unique_id,
            course: item.course,
            grade: item.grade,
        })),
        Etudiants: data.map((item) => ({
            id: item.student.id,
            firstname: item.student.firstname,
            lastname: item.student.lastname,
        })),
        Matières: [...new Set(data.map((item) => item.course))].map((course, index) => ({
            id: index + 1,
            name: course,
        })),
        "A propos": [{ id: 1, content: "Application React développée par Chafki Youness." }],
    };

    const handleClick = (menuItem) => {
        setSelectedMenu(menuItem);
        setIsOpen(false);
        setIsTableVisible(true);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const sortItems = (items, type) => {
        if (type === 'Notes') {
            return items.sort((a, b) => sortOrder === "asc" ? a.grade - b.grade : b.grade - a.grade);
        } else if (type === 'Etudiants') {
            return items.sort((a, b) => sortOrder === "asc"
                ? a.firstname.localeCompare(b.firstname)
                : b.firstname.localeCompare(a.firstname));
        } else if (type === 'Matières') {
            return items.sort((a, b) => sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name));
        }
        return items;
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filterItems = (items) => {
        return items.filter((item) => {
            if (selectedMenu === "Notes") {
                return (
                    item.course.toLowerCase().includes(searchQuery) ||
                    item.grade.toString().includes(searchQuery)
                );
            } else if (selectedMenu === "Etudiants") {
                return (
                    item.firstname.toLowerCase().includes(searchQuery) ||
                    item.lastname.toLowerCase().includes(searchQuery)
                );
            } else if (selectedMenu === "Matières") {
                return item.name.toLowerCase().includes(searchQuery);
            }
            return true;
        });
    };

    const renderContent = () => {
        if (!selectedMenu || !dataByMenu[selectedMenu]) return null;

        let items = dataByMenu[selectedMenu];
        items = filterItems(items);
        items = sortItems(items, selectedMenu);

        return (
            <>
                <button
                    onClick={toggleSortOrder}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "rgba(3,213,255,0.47)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}
                >
                    Trier {sortOrder === "asc" ? "Ascendant" : "Descendant"}
                </button>

                <button
                    onClick={() => setIsTableVisible(false)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#7221ac",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "10px",
                    }}
                >
                    Fermer le tableau
                </button>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            padding: "10px 15px",
                            borderRadius: "25px",
                            border: "1px solid #ddd",
                            width: "300px",
                            marginBottom: "20px",
                            outline: "none",
                            transition: "border-color 0.3s ease",
                            backgroundColor: "#f9f9f9",
                            fontSize: "16px",
                        }}
                    />
                </div>

                <TableContainer
                    component={Paper}
                    style={{
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        marginBottom: '20px',
                        maxWidth: '80%',
                        margin: '0 auto',
                    }}
                >
                    <Table style={{ width: '100%' }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'rgb(114,33,172)', color: '#fff' }}>
                                {Object.keys(items[0]).map((key) => (
                                    <TableCell
                                        key={key}
                                        style={{
                                            fontWeight: 'bold',
                                            padding: '12px 15px',
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {key === 'name' ? 'Matière' : key.toUpperCase()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id} style={{
                                    backgroundColor: '#f9f9f9',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}>
                                    {Object.values(item).map((value, index) => (
                                        <TableCell
                                            key={index}
                                            style={{
                                                padding: '10px 15px',
                                                textAlign: 'center',
                                                borderBottom: '1px solid #ddd',
                                                color: '#333',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const menuPositionStyle = () => {
        if (buttonRef.current) {
            const { top, left, height } = buttonRef.current.getBoundingClientRect();
            return {
                top: top + height + window.scrollY + "px",
                left: left + "px",
            };
        }
        return { top: "40px", left: "20px" };
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    zIndex: 10,
                }}
            >
                Menu
            </button>
            {isOpen && (
                <ul
                    ref={menuRef}
                    style={{
                        position: "absolute",
                        ...menuPositionStyle(),
                        listStyleType: "none",
                        padding: "10px",
                        backgroundColor: "rgba(3,213,255,0.47)",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                    }}
                >
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            style={{ margin: "5px 0", cursor: "pointer" }}
                            onClick={() => handleClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
            <div>
                {isTableVisible && renderContent()}
            </div>
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
        marginTop: "20px",
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Élément Aléatoire</h2>
            <p style={paragraphStyle}>Nom: {item.student.firstname} {item.student.lastname}</p>
            <p style={paragraphStyle}>Matière: {item.course}</p>
            <p style={paragraphStyle}>Note: {item.grade}</p>
            <button style={buttonStyle} onClick={handleRandomize}>Afficher un autre élément</button>
        </div>
    );
}

function App() {
    return (
        <>
            <Header />
            <MainContent />
            <DropdownMenu />
            <RandomItem />
            <Footer />
        </>
    );
}

export default App;
