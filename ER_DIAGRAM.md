# PunchCart E-Commerce Platform - ER Diagram

## Entities

### 1. Users
- id (PK)
- username (required, unique)
- email
- roles (array: ["super-admin", "user"])
- tenants (array of tenant references via multi-tenant plugin)
- createdAt, updatedAt

### 2. Tenants
- id (PK)
- name (required, label: "Store Name")
- slug (required, unique, index)
- image (relation to Media)
- stripeAccountId (required)
- stripeDetailsSubmitted (boolean)
- createdAt, updatedAt

### 3. Products
- id (PK)
- name (required)
- description (richText)
- price (required, number)
- category (relation to Categories)
- tags (array of relations to Tags)
- image (relation to Media)
- cover (relation to Media)
- refundPolicy (select: "30-day","14-day","7-day","3-day","1-day","no-refunds")
- content (richText - protected post-purchase content)
- isPrivate (boolean)
- isArchived (boolean)
- createdAt, updatedAt

### 4. Categories
- id (PK)
- name (required)
- slug (required, unique, index)
- color (text)
- parent (self-reference, optional)
- subcategories (virtual join field referencing parent)
- createdAt, updatedAt

### 5. Tags
- id (PK)
- name (required, unique)
- products (array of relations to Products)
- createdAt, updatedAt

### 6. Media
- id (PK)
- alt (required, text)
- filename, url, etc. (standard Payload media fields)
- createdAt, updatedAt

### 7. Orders
- id (PK)
- name (required)
- user (relation to Users, required)
- product (relation to Products, required)
- stripeCheckoutSessionId (required, text)
- stripeAccountId (required, text)
- createdAt, updatedAt

### 8. Reviews
- id (PK)
- description (required, textarea)
- rating (required, number, min:1, max:5)
- product (relation to Products, required)
- user (relation to Users, required)
- createdAt, updatedAt

## Relationships

### 1. Users ↔ Tenants (Many-to-Many)
- A user can belong to multiple tenants
- A tenant can have multiple users
- Implemented via tenantsArrayField in Users collection

### 2. Tenants → Media (One-to-One, optional)
- A tenant has one image (store logo/banner)
- A media item can be associated with zero or one tenants
- Implemented via image upload relation in Tenants

### 3. Products → Categories (Many-to-One)
- A product belongs to one category
- A category can have multiple products
- Implemented via category relationship in Products

### 4. Products ↔ Tags (Many-to-Many)
- A product can have multiple tags
- A tag can be associated with multiple products
- Implemented via tags relationship in Products and products relationship in Tags

### 5. Products → Media (Two One-to-Many relationships)
- A product has one image (main product image)
- A product has one cover image (cover/banner image)
- A media item can be associated with multiple products (as image or cover)
- Implemented via image and cover upload relations in Products

### 6. Orders → Users (Many-to-One)
- An order belongs to one user
- A user can have multiple orders
- Implemented via user relationship in Orders

### 7. Orders → Products (Many-to-One)
- An order is for one product
- A product can be in multiple orders
- Implemented via product relationship in Orders

### 8. Reviews → Users (Many-to-One)
- A review is written by one user
- A user can write multiple reviews
- Implemented via user relationship in Reviews

### 9. Reviews → Products (Many-to-One)
- A review is for one product
- A product can have multiple reviews
- Implemented via product relationship in Reviews

### 10. Categories ↔ Categories (Self-referencing One-to-Many)
- A category can have one parent category
- A category can have multiple subcategories
- Implemented via parent relationship and subcategories join field in Categories

## Access Control Notes
- Most collections have access controls restricting non-super-admin users
- Tenants can manage their own products, orders, etc. based on their tenant association
- Users can only access their own data (orders, reviews, etc.) unless they are super-admins
- Tenant isolation is enforced through access control rules

## Technical Implementation
- Built with Payload CMS
- Uses MongoDB-like document relationships
- Multi-tenancy implemented via @payloadcms/plugin-multi-tenant
- File uploads handled through Payload's media collection
- Rich text fields for descriptions and content