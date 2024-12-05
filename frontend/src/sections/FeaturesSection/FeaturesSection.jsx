import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import {
  DirectionsCar,
  AttachMoney,
  Verified,
  LocalOffer,
} from "@mui/icons-material";

const features = [
  {
    title: "Wide Selection of Cars",
    description: "Choose from a vast selection of new and used cars.",
    icon: <DirectionsCar style={{ fontSize: 50, color: "#DE3163" }} />,
  },
  {
    title: "Affordable Pricing",
    description: "Get the best deals and prices that fit your budget.",
    icon: <AttachMoney style={{ fontSize: 50, color: "#DE3163" }} />,
  },
  {
    title: "Verified Sellers",
    description: "All sellers are verified to ensure a smooth experience.",
    icon: <Verified style={{ fontSize: 50, color: "#DE3163" }} />,
  },
  {
    title: "Special Offers",
    description: "Enjoy exclusive deals and discounts on select vehicles.",
    icon: <LocalOffer style={{ fontSize: 50, color: "#DE3163" }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Container style={{ padding: "50px 0" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#DE3163", fontWeight: "bold" }}
      >
        Why Choose Us
      </Typography>
      <div className="mt-2 container-fluid">
        <p className="medium-paragraph">
          WheelzLoop connects car sellers and buyers seamlessly. Sellers can
          create an account, list their cars with detailed descriptions and
          photos, and make them visible to thousands of potential buyers. Buyers
          can explore a wide range of verified listings and directly contact
          sellers or dealers to negotiate and finalize deals. With WheelzLoop,
          finding your next car or selling your current one is quick, secure,
          and hassle-free.
        </p>
      </div>
      <Grid container spacing={4} className="mt-4">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              style={{
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <CardContent style={{ textAlign: "center" }}>
                {feature.icon}
                <Typography
                  variant="h6"
                  style={{ marginTop: 20, fontWeight: "bold", color: "#333" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#666", marginTop: 10 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
