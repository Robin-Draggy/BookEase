import { test , expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("rinky@gmail.com");
  await page.locator("[name=password]").fill("123456");
  
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);
  
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
      .locator('[name="description"]')
      .fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
  
    await page.getByText("Budget").click();
  
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
  
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");
  
    await page.setInputFiles('[name="imageFiles"]', [
      path.join(__dirname, "files", "1.jpg"),
      path.join(__dirname, "files", "2.jpg"),
    ]);
  
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
  });



  test("Should display hotels", async ({ page }) =>{
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Shundorbon Hotel")).toBeVisible();
    await expect(page.getByText("In publishing and graphic")).toBeVisible();
    
    await expect(page.getByText("Dhaka, Bangladesh")).toBeVisible();
    await expect(page.getByText("Romantic")).toBeVisible();
    await expect(page.getByText("110 per night")).toBeVisible();
    await expect(page.getByText("4 adults, 3 children")).toBeVisible();
    await expect(page.getByText("5 Star Rating")).toBeVisible();

    await expect(page.getByRole("link", { name: "View Details"})).toBeVisible(); 
    await expect(page.getByRole("link", { name: "Add Hotel"})).toBeVisible(); 

  })