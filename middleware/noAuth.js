export default function (context) {
    // If the user is not authenticated
    if (context.$cookies.get('user')) {
        return context.redirect('/');
    }
}