import React, { useEffect } from "react";
import "./BlogsScreen.css";

function BlogsScreen() {
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Get hash without #
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <section>
      <div className="blogs-container">
        <div className="blog-card" id="used-car-tips">
          <h1 className="blog-title">Top Tips for Buying a Used Car</h1>
          <p className="blog-date">Published on December 6, 2024</p>
          <img
            src="/images/blog1.webp"
            alt="Used car"
            className="w-100 blog-image"
          />
          <div className="blog-content">
            <h2 className="blog-subtitle">1. Set Your Budget</h2>
            <p>
              Before you start browsing, make sure you have a clear idea of how
              much you're willing to spend. Consider not just the cost of the
              car, but also maintenance, insurance, and taxes.
            </p>
            <h2 className="blog-subtitle">2. Research the Car's History</h2>
            <p>
              Check the vehicle’s history report to ensure it hasn't been in any
              serious accidents or had any major issues. Services like Carfax
              can be helpful for this.
            </p>
            <h2 className="blog-subtitle">3. Inspect the Car in Person</h2>
            <p>
              Always inspect the car in person and take it for a test drive. Pay
              attention to any unusual noises and check for any signs of wear
              and tear.
            </p>
            <h2 className="blog-subtitle">4. Negotiate the Price</h2>
            <p>
              Don't be afraid to negotiate. Sellers often expect you to haggle,
              and you could end up saving a lot of money.
            </p>
            <h2 className="blog-subtitle">5. Get a Pre-Purchase Inspection</h2>
            <p>
              Consider hiring a mechanic to perform a pre-purchase inspection.
              This can uncover potential problems that could cost you in the
              long run.
            </p>
            <h2 className="blog-subtitle">6. Review the Paperwork Carefully</h2>
            <p>
              Make sure all the paperwork is in order before you finalize the
              deal. Double-check the title, registration, and bill of sale to
              avoid any surprises later on.
            </p>
          </div>
        </div>
      </div>
      <div className="blogs-container" id="best-price">
        <div className="blog-card">
          <h1 className="blog-title">How to Get the Best Price for Your Car</h1>
          <p className="blog-date">Published on December 6, 2024</p>
          <img
            src="/images/blog2.webp"
            alt="Best price for your car"
            className="blog-image"
          />
          <div className="blog-content">
            <h2 className="blog-subtitle">1. Know Your Car's Value</h2>
            <p>
              Before selling your car, it's crucial to know its market value.
              Use online resources like Kelley Blue Book or Edmunds to get an
              estimate of what your car is worth based on its make, model, year,
              and condition.
            </p>
            <h2 className="blog-subtitle">2. Make Necessary Repairs</h2>
            <p>
              Small repairs can make a big difference in the sale price. Take
              care of minor issues like scratches, dents, or non-functioning
              lights. A well-maintained car will attract more buyers.
            </p>
            <h2 className="blog-subtitle">3. Clean and Detail Your Car</h2>
            <p>
              First impressions matter. A clean car, both inside and out, will
              increase its appeal and can even make it seem more valuable.
              Consider having your car professionally detailed before listing it
              for sale.
            </p>
            <h2 className="blog-subtitle">
              4. Gather All Necessary Documentation
            </h2>
            <p>
              Buyers will feel more confident if you have all the necessary
              paperwork in order. Make sure you have the title, registration,
              service records, and any other relevant documents.
            </p>
            <h2 className="blog-subtitle">5. Set a Competitive Price</h2>
            <p>
              While you want to get the best price, setting a competitive price
              is essential. Research similar cars in your area to see what
              similar vehicles are selling for and price yours accordingly.
            </p>
            <h2 className="blog-subtitle">6. Be Ready to Negotiate</h2>
            <p>
              Most buyers expect to negotiate. Set a price that's a little
              higher than what you're willing to accept to leave room for
              negotiation. Be open to offers, but know your bottom line.
            </p>
            <h2 className="blog-subtitle">
              7. Choose the Right Platform to Sell
            </h2>
            <p>
              Whether you're selling through a dealership, online marketplace,
              or privately, make sure you choose the platform that offers the
              best potential for reaching serious buyers and getting the best
              price.
            </p>
          </div>
        </div>
      </div>
      <div className="blogs-container" id="maintainance-checklist">
        <div className="blog-card">
          <h1 className="blog-title">Car Maintenance Checklist</h1>
          <p className="blog-date">Published on December 6, 2024</p>
          <img
            src="/images/blog4.jpg"
            alt="Car maintenance"
            className="blog-image"
          />
          <div className="blog-content">
            <h2 className="blog-subtitle">1. Check Engine Oil</h2>
            <p>
              Engine oil is the lifeblood of your car's engine. Check the oil
              level regularly and change it according to your car's manual. This
              ensures smooth engine performance and prevents overheating.
            </p>
            <h2 className="blog-subtitle">2. Inspect Tire Pressure</h2>
            <p>
              Proper tire pressure ensures better fuel efficiency and helps
              prevent premature tire wear. Check tire pressure every month and
              before long trips.
            </p>
            <h2 className="blog-subtitle">3. Replace Air Filters</h2>
            <p>
              Air filters prevent dirt and debris from entering the engine.
              Check and replace your air filters as needed to maintain good
              engine performance and fuel efficiency.
            </p>
            <h2 className="blog-subtitle">4. Test Your Brakes</h2>
            <p>
              Your car's brakes are essential for safety. Have them checked
              periodically for wear and tear. If you hear any unusual noises or
              feel vibrations, get them inspected immediately.
            </p>
            <h2 className="blog-subtitle">5. Check Fluid Levels</h2>
            <p>
              Regularly check all essential fluids like brake fluid, coolant,
              power steering fluid, and transmission fluid. Low levels could
              indicate a problem, and keeping them topped off ensures smooth
              operation.
            </p>
            <h2 className="blog-subtitle">6. Inspect the Battery</h2>
            <p>
              A healthy battery is vital for your car's starting system. Check
              for corrosion, ensure the connections are secure, and have it
              tested to avoid getting stranded.
            </p>
            <h2 className="blog-subtitle">7. Replace Wiper Blades</h2>
            <p>
              Wiper blades are crucial for visibility during rainy or snowy
              weather. Check them regularly for signs of wear, and replace them
              if they leave streaks or miss spots.
            </p>
            <h2 className="blog-subtitle">8. Inspect Belts and Hoses</h2>
            <p>
              Belts and hoses keep your engine running smoothly. Inspect them
              for cracks, leaks, or wear. Replace them as necessary to avoid
              engine damage.
            </p>
            <h2 className="blog-subtitle">9. Maintain the Cooling System</h2>
            <p>
              A well-maintained cooling system prevents your engine from
              overheating. Flush the radiator and replace coolant as recommended
              by your car's manual.
            </p>
            <h2 className="blog-subtitle">10. Rotate Tires</h2>
            <p>
              Tire rotation helps ensure even tire wear and prolongs the life of
              your tires. Rotate your tires regularly, ideally every 6,000 to
              8,000 miles.
            </p>
          </div>
        </div>
      </div>
      <div className="blogs-container" id="latest-trends">
        <div className="blog-card">
          <h1 className="blog-title">Latest Trends in the Used Car Market</h1>
          <p className="blog-date">Published on December 6, 2024</p>
          <img
            src="/images/blog3.jpg"
            alt="Used car market trends"
            className="blog-image"
          />
          <div className="blog-content">
            <h2 className="blog-subtitle">1. Increased Demand for Used Cars</h2>
            <p>
              The demand for used cars has surged over the last few years. Due
              to global supply chain disruptions and semiconductor shortages,
              new car production has slowed, prompting many buyers to turn to
              the used car market. As a result, used car prices have risen
              significantly.
            </p>
            <h2 className="blog-subtitle">2. Shift Toward Online Car Buying</h2>
            <p>
              More consumers are opting to buy cars online. Websites and apps
              have made it easier than ever for buyers to shop for used cars
              from the comfort of their homes. This trend is expected to
              continue as online platforms enhance their features, including
              virtual showrooms and home delivery services.
            </p>
            <h2 className="blog-subtitle">
              3. Rising Popularity of Certified Pre-Owned (CPO) Vehicles
            </h2>
            <p>
              Certified Pre-Owned vehicles, which are inspected, refurbished,
              and backed by a manufacturer warranty, are becoming more popular.
              Buyers are increasingly looking for peace of mind when purchasing
              used cars, and CPO vehicles offer that assurance with added value.
            </p>
            <h2 className="blog-subtitle">
              4. Focus on Vehicle History Transparency
            </h2>
            <p>
              Consumers are placing more importance on the history of the
              vehicle they are buying. Car history reports, including accident
              records, maintenance logs, and ownership history, have become
              essential to the decision-making process. Transparency is key to
              building trust in the used car market.
            </p>
            <h2 className="blog-subtitle">
              5. Electric and Hybrid Vehicles in the Used Market
            </h2>
            <p>
              The growing popularity of electric vehicles (EVs) and hybrid cars
              has made its way into the used car market. Many buyers are opting
              for used electric cars or hybrids as an affordable way to
              experience eco-friendly driving without paying the premium of new
              EV models.
            </p>
            <h2 className="blog-subtitle">
              6. Impact of the Chip Shortage on Used Car Pricing
            </h2>
            <p>
              The global semiconductor chip shortage has led to a scarcity of
              new cars, driving up demand for used vehicles. This has caused a
              spike in used car prices. The shortage is expected to continue
              impacting the market, but some analysts predict prices may
              stabilize in the coming months.
            </p>
            <h2 className="blog-subtitle">
              7. Shift Toward More Fuel-Efficient Cars
            </h2>
            <p>
              As fuel prices rise and environmental concerns grow, consumers are
              increasingly looking for fuel-efficient vehicles. Compact cars,
              hybrids, and smaller SUVs are seeing a boost in demand as buyers
              look to save on fuel costs.
            </p>
            <h2 className="blog-subtitle">
              8. The Role of Social Media and Influencers
            </h2>
            <p>
              Social media platforms have become key players in the used car
              market. Car influencers, dealerships, and private sellers are
              using social media to reach a broader audience and promote their
              vehicles. Platforms like Instagram, TikTok, and YouTube are
              shaping consumer purchasing decisions.
            </p>
            <h2 className="blog-subtitle">
              9. Subscription and Car Sharing Services
            </h2>
            <p>
              The rise of car subscription services, which allow customers to
              rent vehicles on a monthly basis, is influencing the used car
              market. These services provide an alternative to traditional car
              ownership and have become an attractive option for those looking
              for flexibility and convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogsScreen;
