import React from 'react';
import './faq.css';
import Nav from '../Navbar/Nav';
import Footer from '../Navbar/foot';

const FAQ = () => {
    const rulesAndRegulations = [
        'All bids are binding; make sure you intend to buy the item if you win.',
        'Bidders must be at least 18 years old to participate in auctions.',
        'Selling of firearms or any illegal/harmful items is strictly prohibited; violating this rule will result in account suspension and legal actions.',
        'Users are required to pay for the item within 48 hours of winning the auction; failure to do so will result in penalties and possible account suspension.',
        'Do not engage in shill bidding (placing fake bids to inflate the price); such behavior will result in immediate account suspension.',
        'Any attempt to manipulate auctions or interfere with other users’ bids will lead to account suspension.',
        'The auction platform reserves the right to cancel bids or auctions at its discretion if it suspects fraudulent activity.',
        'Users are responsible for reading and understanding the terms and conditions of each auction before placing a bid.',
        'The auction platform is not liable for any damages, loss of funds, or misrepresentation of items; users bid at their own risk.',
        'Accounts with repeated violations or fraudulent activities will be permanently banned from the platform.',
        // Add more rules and regulations as needed
      ];


  const faqData = [
    {
      question: 'How can I place a bid?',
      answer: 'To place a bid, navigate to the desired item and click on the "Place Bid" button. Enter your bid amount and confirm.'
    },
    {
      question: 'What happens if I win an auction?',
      answer: 'If you are the highest bidder when the auction ends, you will be notified and provided details to complete the purchase.'
    },
    {
        question: 'Can I retract or cancel my bid?',
        answer: 'Generally, bids in auctions are binding. However, certain circumstances like an error in the bid amount or description might allow for bid retractions, but it’s essential to check the auction site’s policies.'
      },
      {
        question: 'Is there a limit on the number of bids I can place?',
        answer: 'Auctions might have bid limits or restrictions per user. These limits are usually in place to ensure fair participation for all users.'
      },
      {
        question: 'How long do auctions typically last?',
        answer: 'Auction durations vary based on the platform and the item being auctioned. They can range from a few hours to several days.'
      }
    // Add more FAQ items as needed
  ];



  return (
    <div>
      <div className="faq-container">
      <Nav /><br/>
        <h2>Rules and Regulations</h2><br/>
        <div className="card-container rules-list">
          {rulesAndRegulations.map((rule, index) => (
            <div className="card rule-item" key={index}>
              <div className="card-body">
                <p className="card-text">{rule}</p>
              </div>
            </div>
          ))}
        </div><br/>
        <hr /><br/>
        <h2>Frequently Asked Questions</h2><br/>
        <div className="card-container faq-list">
          {faqData.map((faq, index) => (
            <div className="card faq-item" key={index}>
              <div className="card-body">
                <h5 className="card-title">{faq.question}</h5><br/>
                <p className="card-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FAQ;