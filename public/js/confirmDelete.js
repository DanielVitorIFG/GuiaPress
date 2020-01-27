function confirmDelete(choice,event,form) {
    event.preventDefault(); // impedir que o form seja submetido
    var decision = confirm(`Deseja deletar ${choice} ?`);
    if (decision) {
        form.submit();          
    }
}