function confirmDelete(event,form) {
    event.preventDefault(); // impedir que o form seja submetido
    var decision = confirm("Você quer deletar esta categoria ?");
    if (decision) {
        form.submit();          
    }
}