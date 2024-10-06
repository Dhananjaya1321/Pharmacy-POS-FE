import {Link} from "react-router-dom";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ecommerce from "../../assets/website/ecommerce.png";
import {Footer} from "../Footer/Footer";

export const CustomerSupport = () => {
    return (
        <main className="w-full h-max flex flex-col justify-center items-center">
            <section className="z-50 flex items-center fixed top-0 left-0 right-0 w-full shadow-md bg-white h-[65px]">
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
                <section className="flex flex-wrap flex-row mt-10 items-center w-full justify-around">
                    <div className="relative text-start shadow-xl w-[45%] h-[700px] rounded-lg px-7 pb-7">
                        <div className="rotate-45 text-[#fdff00] flex justify-center items-center absolute top-[-20px]
                         right-[-20px] w-[100px] h-[100px] bg-[#ff0015]">
                            <div
                                className="absolute rotate-45 flex justify-center items-center w-[100px] h-[100px] bg-[#ff0015]"></div>
                            <h1 className="rotate-[-30deg] text-4xl z-10">40%</h1>
                        </div>
                        <img src={ecommerce}/>
                        <h1 className="text-2xl">E-Commerce Website Development</h1>
                        <p className="mt-4">We offer a fully functional, feature-rich e-commerce website to help you
                            expand your business
                            online. From product listings to secure payment gateways, we ensure everything is tailored
                            to your pharmacy's specific needs.</p>
                        <menu className="mt-4">
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> 10-15 Fully Customized Pages
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Payment Gateway Integration (e.g., PayHere)
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Professional UI/UX Design
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> SEO Optimization
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Security Setup
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Domain & Hosting
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> 1 Year of Free Technical Support and
                                Maintenance
                            </li>
                        </menu>
                    </div>
                    <div className="relative text-start shadow-xl w-[45%] h-[700px] rounded-lg px-7 pb-7">
                        <div className="rotate-45 text-[#fdff00] flex justify-center items-center absolute top-[-20px]
                         right-[-20px] w-[100px] h-[100px] bg-[#ff0015]">
                            <div
                                className="absolute rotate-45 flex justify-center items-center w-[100px] h-[100px] bg-[#ff0015]"></div>
                            <h1 className="rotate-[-30deg] text-4xl z-10">20%</h1>
                        </div>
                        <img src={ecommerce}/>
                        <h1 className="text-2xl">E-Commerce Website Development</h1>
                        <p className="mt-4">We offer a fully functional, feature-rich e-commerce website to help you
                            expand your business
                            online. From product listings to secure payment gateways, we ensure everything is tailored
                            to your pharmacy's specific needs.</p>
                        <menu className="mt-4">
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> 5-10 Fully Customized Pages
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Professional UI/UX Design
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> SEO Optimization
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Security Setup
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> Domain & Hosting
                            </li>
                            <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon
                                icon={faCheck} style={{color: "#22ff1f",}}/> 1 Year of Free Technical Support and
                                Maintenance
                            </li>
                        </menu>
                    </div>
                </section>

                <h1 className="mt-10 text-3xl">How to Avail These Offers</h1>
                <p className="text-start mt-4">
                    Simply reach out to us using the contact details below, and mention that you are a Smart Pharmacy
                    customer to get the discount
                </p>
                <p className="text-start mt-4">
                    WhatsApp: <span className="text-blue-900">+947 67 15 1321</span><br/>
                    Mobile Number: <span className="text-blue-900">+947 67 15 1321</span><br/>
                    Email: <span className="text-blue-900">info@novalabsglobal.com</span><br/>
                    Website: <a href="https://novalabsglobal.com"><span
                    className="text-blue-900">Nova Labs Global</span></a><br/>
                </p>
                <p className="text-start mt-4">
                    These offers are valid for a limited time, so don’t miss out! Let us help you grow your business
                    with a professional online presence.
                </p>
                <p className="text-start mt-4">
                    Thank you for choosing <a href="https://novalabsglobal.com"><span
                    className="text-blue-900">Nova Labs Global</span></a>!
                </p>
            </section>
            <Footer/>
        </main>
    );
};
