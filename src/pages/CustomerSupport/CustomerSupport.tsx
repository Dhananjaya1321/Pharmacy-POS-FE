import {Link} from "react-router-dom";

export const CustomerSupport = () => {
    return (
        <main className="w-full h-max flex flex-col justify-center items-center">
            <section className="flex items-center fixed top-0 left-0 right-0 w-full shadow-md bg-white h-[65px]">
                <Link to={'/home'} className="flex justify-center h-[45px]">
                    <button className="bg-blue-950 text-white py-3 ml-1 px-4 rounded-lg">
                        Back to home
                    </button>
                </Link>
            </section>
            <section className="w-[90%] h-max flex flex-col items-start mt-[100px] pb-8">
                <h1 className="text-3xl">Customer Support - Smart Pharmacy</h1>
                <p className="text-start mt-4">
                    Thank you for choosing our Pharmacy Management POS System, developed by Nova Labs Global. We are
                    dedicated to providing ongoing support and assistance for all your pharmacy business needs. Our
                    customer support team is here to ensure you get the most out of your software and help with any
                    inquiries or issues that may arise.
                </p>

                <h1 className="text-3xl mt-10">Contact Us for Support or Inquiries</h1>
                <p className="text-start mt-4">
                    If you need assistance with the POS system, have questions about updates, or wish to reach out for
                    any reason, feel free to contact us through the following
                </p>
                <p className="text-start mt-4">
                    WhatsApp: <span className="text-blue-900">+947 67 15 1321</span><br/>
                    Mobile Number: <span className="text-blue-900">+947 67 15 1321</span><br/>
                    Email: <span className="text-blue-900">info@novalabsglobal.com</span><br/>
                    Website: <a href="https://novalabsglobal.com"><span
                    className="text-blue-900">Nova Labs Global</span></a><br/>
                </p>


                <h1 className="text-3xl mt-10">Exclusive Website Development Offers for Smart Pharmacy Customers</h1>
                <p className="text-start mt-4">
                    We are excited to extend two special offers exclusively to all Smart Pharmacy customers. As part of
                    our commitment to supporting your business, you can now avail the following discounts
                </p>
                <section className="flex flex-row mt-5 items-center w-full justify-around">
                    <div className="bg-blue-950 w-[45%] h-[300px] rounded-lg"></div>
                    <div className="bg-blue-950 w-[45%] h-[300px] rounded-lg"></div>
                </section>
            </section>
        </main>
    );
};
