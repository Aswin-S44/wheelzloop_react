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
    icon: <DirectionsCar style={{ fontSize: 50, color: "#1a9d74" }} />,
  },
  {
    title: "Affordable Pricing",
    description: "Get the best deals and prices that fit your budget.",
    icon: <AttachMoney style={{ fontSize: 50, color: "#1a9d74" }} />,
  },
  {
    title: "Verified Sellers",
    description: "All sellers are verified to ensure a smooth experience.",
    icon: <Verified style={{ fontSize: 50, color: "#1a9d74" }} />,
  },
  {
    title: "Special Offers",
    description: "Enjoy exclusive deals and discounts on select vehicles.",
    icon: <LocalOffer style={{ fontSize: 50, color: "#1a9d74" }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Container style={{ padding: "50px 0" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#1a9d74", fontWeight: "bold" }}
      >
        Why Choose Us
      </Typography>
      <Grid container spacing={4}>
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
