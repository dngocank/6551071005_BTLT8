$(document).ready(function() {
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    $('#addRow').click(function() {
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const birthdate = $('#birthdate').val();

        $('.form-input').removeClass('error');
        $('.error-message').remove();

        let hasError = false;

        if (name === '') {
            $('#name').addClass('error');
            $('#name').after('<div class="error-message">Vui lòng nhập tên</div>');
            hasError = true;
        }

        if (email === '' || !validateEmail(email)) {
            $('#email').addClass('error');
            $('#email').after('<div class="error-message">Email không hợp lệ</div>');
            hasError = true;
        }

        if (birthdate === '') {
            $('#birthdate').addClass('error');
            $('#birthdate').after('<div class="error-message">Vui lòng chọn ngày sinh</div>');
            hasError = true;
        }

        if (!hasError) {
            const newRow = `
                <tr>
                    <td><input type="checkbox" class="select-row"></td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${birthdate}</td>
                </tr>
            `;

            $('#userTable tbody').append(newRow);

            $('#name').val('');
            $('#email').val('');
            $('#birthdate').val('');
        }
    });

    $('#deleteRow').click(function() {
        $('.select-row:checked').closest('tr').remove();
    });

});
