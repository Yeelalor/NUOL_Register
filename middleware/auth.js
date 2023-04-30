export default function (context) {
    if (!context.$cookies.get('user')) {
        return context.redirect('/student/login');
    }
}