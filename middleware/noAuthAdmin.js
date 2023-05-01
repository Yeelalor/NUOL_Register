export default function (context) {
    // If the user is not authenticated
    if (context.$cookies.get('user') && context.$cookies.get('userType') !== 'student') {
        return context.redirect('/teachers/edit');
    }
}