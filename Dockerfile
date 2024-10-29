# Use the official Bun image with Debian Linux
# Oven is the company name, the creator of Bun
FROM oven/bun

# Create and change to the app directory
WORKDIR /app

# Copy app files
COPY . /app

# Install app dependencies
RUN bun install

# Copy prisma files
COPY prisma ./prisma/

COPY . .

RUN bunx prisma generate

# Run the application
CMD ["bun", "start:migrate:production"] 