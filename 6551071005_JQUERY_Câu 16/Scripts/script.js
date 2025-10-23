$(document).ready(function() {
    // Validate email function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Handle Add Row button click
    $('#addRow').click(function() {
        // Get input values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const birthdate = $('#birthdate').val();

        // Remove previous error states
        $('.form-input').removeClass('error');
        $('.error-message').remove();

        // Validation
        let hasError = false;

        // Validate Name
        if (name === '') {
            $('#name').addClass('error');
            $('#name').after('<div class="error-message">Vui lòng nhập tên</div>');
            hasError = true;
        }

        // Validate Email
        if (email === '' || !validateEmail(email)) {
            $('#email').addClass('error');
            $('#email').after('<div class="error-message">Email không hợp lệ</div>');
            hasError = true;
        }

        // Validate Birthdate
        if (birthdate === '') {
            $('#birthdate').addClass('error');
            $('#birthdate').after('<div class="error-message">Vui lòng chọn ngày sinh</div>');
            hasError = true;
        }

        // If there are no errors, add the row
        if (!hasError) {
            // Create new row
            const newRow = `
                <tr>
                    <td><input type="checkbox" class="select-row"></td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${birthdate}</td>
                </tr>
            `;

            // Add row to table
            $('#userTable tbody').append(newRow);

            // Clear input fields
            $('#name').val('');
            $('#email').val('');
            $('#birthdate').val('');
        }
    });

    // Handle Delete Row button click
    $('#deleteRow').click(function() {
        // Remove selected rows
        $('.select-row:checked').closest('tr').remove();
    });
});