import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HamburguerMenu.css";
const HamburguerMenu = ({
    nomeUsuario,
    onExportPDF,
    onExportXLS,
    onPrint,
    onGetPro,
    onDeleteList
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => setIsOpen(!isOpen);
    const handleGetPro = () => {
        navigate("/UpgradePro");
    };

    return (
        <div style={{ position: "relative" }}>
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`} onClick={handleClick}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>
            {isOpen && (
                <div className="menu-dropdown">
                    <div className="usuario-menu">
                        <span className="profile-name-menu">{nomeUsuario}</span>
                    </div>
                    <button onClick={onExportPDF}>
                        <img
                            src="/src/assets/images/PDF.png"
                            alt="PDF"
                            style={{ width: 24, verticalAlign: "middle", marginRight: 8 }}
                        />
                        Exportar como .pdf{" "}
                        <img src="/src/assets/images/abelha1.png" alt="Abelha" style={{ width: 22, verticalAlign: "middle" }} />
                    </button>
                    <button onClick={onExportXLS}>
                        <img
                            src="/src/assets/images/MicrosoftExcel.png"
                            alt="Excel"
                            style={{ width: 24, verticalAlign: "middle", marginRight: 8 }}
                        />
                        Exportar como .xls
                        <img
                            src="/src/assets/images/abelha1.png"
                            alt="Abelha"
                            style={{ width: 22, verticalAlign: "middle", marginLeft: 8 }}
                        />
                    </button>
                    <button onClick={onPrint}>
                        <img
                            src="/src/assets/images/Print.png"
                            alt="Print"
                            style={{ width: 24, verticalAlign: "middle", marginRight: 8 }}
                        />
                        Imprimir lista{" "}
                        <img src="/src/assets/images/abelha1.png" alt="Abelha" style={{ width: 22, verticalAlign: "middle" }} />
                    </button>
                    <button
                        onClick={handleGetPro}
                        style={{ marginTop: "60px", marginLeft: "-5px" }}
                    >
                        <img
                            src="/src/assets/images/abelha1.png"
                            alt="Abelha"
                            style={{ width: 25, verticalAlign: "middle", marginRight: 8 }}
                        />
                        Obter BeeList Pro
                    </button>
                    <hr />
                    <button
                        className="delete"
                        onClick={onDeleteList}
                        style={{ marginTop: "-16px" }}
                    >
                        <img
                            src="/src/assets/images/lixeira1.png"
                            alt="Lixeira"
                            style={{
                                width: 25,
                                verticalAlign: "text-bottom",
                                marginRight: 8,
                                marginBottom: 3
                            }}
                        />
                        Deletar lista
                    </button>
                </div>
            )}
        </div>
    );
};

export default HamburguerMenu;
