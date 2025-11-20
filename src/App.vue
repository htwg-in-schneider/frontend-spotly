<script setup></script>

<template>
<!-- Hintergrund -->
<div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>
    <img src="@/assets/background.jpeg" alt="Background" class="bg-image">
</div>

<div class="logo-container">
    <img src="@/assets/logo.png" alt="Spotly Logo" class="logo-outside"/>
</div>

<header class="header">
    <nav class="nav">
        <a href="#">Home</a>
        <a href="#">Spots</a>
        <a href="#">Karte</a>
        <a href="#">Über uns</a>
        <a href="#">Support</a>
        <a href="#" class="search-icon">
            <img src="@/assets/search.svg" alt="Suche">
        </a>
    </nav>
</header>

<button class="login-btn">Log In</button>

<!-- Carousel-->
<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="@/assets/park.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="@/assets/shop.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="@/assets/event.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="@/assets/cafe.jpeg" class="d-block w-100" alt="...">
        </div>
    </div>
    <!-- Steuerpfeile für das Carousle -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

<main>
    <section class="slogan">
        <h1>Entdecke Konstanz neu!</h1>
    </section>

    <!-- Neuer Call-to-Action Button in der Mitte -->
    <div class="cta-container">
        <a href="spots.html" class="spots-link">>>Hier mehr Spots entdecken</a>
    </div>
    <!-- Scroll-Zone -->
    <section class="scroll-space"></section>

    <section class="intro-wave">
        <div class = "wave-content">
        <img src="@/assets/Moritz.jpg" alt="Linkes Bild" class="circle-image">
        <div class="wave-text">
            <h2>Unsere Idee hinter Spotly:</h2>
            <p>
                Spotly ist unsere Art, Konstanz neu zu entdecken! Durch echte Tipps von echten Menschen.
                Wir, Efe-liz und Moritz, haben Spotly entwickelt, weil wir gemerkt haben, wie schwer es ist, gute Orte
                zu finden, wenn man neu in der Stadt ist.
                Auf Spotly teilen Locals ihre Lieblingsplätze, von kleinen Cafés bis zu geheimen Spots am See.
            </p>
        </div>
        <!-- <img src="@/assets/Efe-Liz.jpeg" alt="Rechtes Bild" class="circle-image">-->
        </div>
    </section>

    <section class="scroll-space"></section>

    <!-- Spots-Bereich -->
    <section class="spots">
        <div class="spots-container">
            <div class="spot-card">
                <img src="@/assets/park.jpg" alt="Natur & Aussicht">
                <p>Natur & Aussicht</p>
            </div>
            <div class="spot-card">
                <img src="@/assets/shop.jpg" alt="Shops & Märkte">
                <p>Shops & Märkte</p>
            </div>
            <div class="spot-card">
                <img src="@/assets/event.jpg" alt="Events & Kultur">
                <p>Events & Kultur</p>
            </div>
            <div class="spot-card">
                <img src="@/assets/cafe.jpeg" alt="Cafés & Essen">
                <p>Cafés & Essen</p>
            </div>
        </div>
    </section>
</main>

<footer>
    <p>©️ 2025 Spotly – von Efe-liz & Moritz</p>
</footer>
</template>

<style scoped></style>
