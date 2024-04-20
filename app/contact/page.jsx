export const runtime = 'edge'
const Contact = () => {

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap">
                <div className="flex items-center flex-shrink-0">
                    <a href="/">
                        <h1 className="font-semibold text-3xl tracking-tight">__fsdrafter__</h1>
                    </a>
                </div>
            </nav>
            <div className="lg:p-0 p-4 mt-4">
                <div>
                    For any questions, comments or concerns please don't hesitate to send us an email at support@fsdrafter.com.
                    <br/>
                    We are a small team so we will get back with you promptly. Thank you.
                    <br/>
                    <br/>
                    <h3 className="text-xl font-bold">support@fsdrafter.com</h3>
                </div>
            </div>
        </>
    );
};

export default Contact;