exports.get_add = ((request, response, next) => {
    response.render('new');
});
exports.post_add = ((request, response, next) => {
    console.log(request.body);
    personajes.push(request.body);
    response.redirect('/personajes');
});

exports.get_old = ((request, response, next) => {
    const path = request('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
});

exports.get_list = ((request, response, next) => {
    response.render('list', {personajes: personajes}); //Manda la respuesta
});