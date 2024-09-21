const notFound = (req, res) => {
    const error = new Error('Not Found');
    res.status(404).json({msg: error.message});
}

export default notFound;