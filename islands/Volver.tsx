const Volver = () => {
    const handleVolver = () => {
        window.location.href = '/';
    };

    return (
        <button class = "btn btn-blue" onClick={handleVolver}>
            Volver
        </button>
    );
};

export default Volver;