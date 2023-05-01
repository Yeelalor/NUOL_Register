export default function (context) {
    if (!context.$cookies.get('user') || context.$cookies.get('userType') === 'student') {
        return context.redirect('/admin');
    }
}