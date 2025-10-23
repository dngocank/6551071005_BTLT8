$(document).ready(function() {
    // Lấy todo list từ localStorage nếu có
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Hiển thị các todo có sẵn
    renderTodos();

    // Xử lý thêm todo mới
    function addTodo() {
        const newItemText = $('#newItem').val().trim();
        
        if (newItemText) {
            // Thêm todo mới vào mảng
            todos.push({
                text: newItemText,
                completed: false
            });
            
            // Lưu vào localStorage
            saveTodos();
            
            // Render lại danh sách
            renderTodos();
            
            // Clear input
            $('#newItem').val('');
        }
    }

    // Xử lý khi nhấn nút thêm
    $('#addItem').click(addTodo);

    // Xử lý khi nhấn Enter trong input
    $('#newItem').keypress(function(e) {
        if (e.which === 13) { // 13 là mã phím Enter
            addTodo();
        }
    });

    // Xử lý đánh dấu hoàn thành
    $(document).on('click', '.todo-text', function() {
        const index = $(this).parent().index();
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    });

    // Xử lý xóa todo
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).parent().index();
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    });

    // Hàm render todos
    function renderTodos() {
        const todoList = $('#todoList');
        todoList.empty();

        todos.forEach(todo => {
            const todoItem = $('<li>').addClass('todo-item');
            const todoText = $('<span>')
                .addClass('todo-text')
                .text(todo.text);
            
            if (todo.completed) {
                todoText.addClass('completed');
            }

            const deleteBtn = $('<button>')
                .addClass('delete-btn')
                .html('&#10005;'); // Dấu X

            todoItem.append(todoText, deleteBtn);
            todoList.append(todoItem);
        });
    }

    // Hàm lưu todos vào localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});