import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Question from "../components/faq/Question";

import StatusMessage from "../alerts/StatusMessage";
import SupportChat from "../components/supportchat/SupportChat";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import '../styles/supportchat.css'

const FAQ = () => {

    const { user } = useContext(UserContext)

    const [toggleChat, setToggleChat] = useState(false) ; //state to toggle SupportChat.jsx component
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components


    const faqs = [
    {
        title: "Ordering & Products",
        icon: <i className="fa-solid fa-circle-info"></i>,
        items: [
            {
                question: "How do I place an order?",
                answer: "Browse the products, select the items you want, add them to your cart, and proceed to checkout. You must create an account to complete the order."
            },
            {
                question: "Can I modify or cancel my order after placing it?",
                answer: "You can only cancel an order after checkout and before it has been processed. Modifications are not allowed."
            },
            {
                question: "Do you offer product warranties or guarantees?",
                answer: "Yes, all products come with standard guarantees. Warranty details are provided on each product page."
            },
            {
                question: "Are there any special product types or restrictions?",
                answer: "No, all products follow the same standard policies."
            }
        ]
    },
    {
        title: "Payment & Billing",
        icon: <i className="fa-solid fa-credit-card"></i>,
        items: [
            {
                question: "What payment methods are accepted?",
                answer: "We currently accept full payments via Stripe."
            },
            {
                question: "Is it safe to use my credit/debit card on your website?",
                answer: "Yes, all payment transactions are secured with SSL encryption and processed through Stripe."
            },
            {
                question: "Can I pay in installments or use multiple payment methods?",
                answer: "No, only full payment is accepted per order."
            }
        ]
    },
    {
        title: "Shipping & Delivery",
        icon: <i className="fa-solid fa-truck-fast"></i>,
        items: [
            {
                question: "Do you offer international shipping?",
                answer: "No, we currently only ship locally."
            },
            {
                question: "How long does delivery take?",
                answer: "Delivery typically takes up to 7 days after placing the order."
            },
            {
                question: "Are there any special shipping rules?",
                answer: "No, we do not have special shipping options at this time."
            }
        ]
    },
    {
        title: "Account & Support",
        icon: <i class="fa-regular fa-user"></i>,
        items: [
            {
                question: "Do I need an account to place an order?",
                answer: "Yes, creating an account is required to place orders."
            },
            {
                question: "How do I contact customer support?",
                answer: "You can contact support via the built-in support chat on the website or by email at support@example.com."
            }
        ]
    },
    {
        title: "Feedback & Reports",
        icon: <i className="fa-solid fa-comment-dots"></i>,
        items: [
            {
                question: "Can I provide feedback on products?",
                answer: "Yes, our system allows users to submit feedback and reports on products."
            },
            {
                question: "Are there any feedback restrictions?",
                answer: "Feedback should be relevant and constructive. Abusive or irrelevant reports may be removed by the admin."
            }
        ]
    }
];

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

                <div className="main-body">
                    <div className="main-start"><Sidebar /></div>
                    <div className="main-end">

                        <div className="main-header"><Header /></div>

                        <h1 className="fw-bold" style={{color : '#10b981', fontSize : '48px'}}>Frequently Asked Questions</h1>
                        <h6 className="small">Find quick answers to the most common questions about ordering, payments, shipping, and account management. If you can’t find what you’re looking for, feel free to contact our support team.</h6>
                        
                        <div className="faq-list-container mt-5">
                            {faqs.map(faq => <Question faq={faq}/>)}
                        </div>

                        {user ? <div className="support-chat-placeholder p-4">
                            <div className="d mb-4">
                                <h2 className="fw-bold">Still Need Assistance?</h2>
                                <h6 className="small">Can’t find what you’re looking for? Our support team is ready to help you in real time.Open the chat and get quick answers to your questions.</h6>
                            </div>
                            <button className="btn border-0 px-4 py-2" onClick={() => setToggleChat(true)}>Open Support Chat</button>
                        </div> : <></>}
    
                        {toggleChat ? <div className="support-chat-main-container"><SupportChat  setToggleChat={setToggleChat} setToggleAlert={setToggleAlert}/></div> : <></> }

                    </div>
                </div>
                <Footer />
        </div>
    )
}

export default FAQ