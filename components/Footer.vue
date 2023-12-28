<template>
  <footer>
    <a class="link" href="https://github.com/SenaNur3/task-manager.git"
      >https://github.com/SenaNur3/task-manager.git</a
    >
    <div class="">Sena Nur Ertürk</div>
  </footer>
</template>

<style>
footer {
  width: 100%;
  max-width: 1200px;
  border: 1px solid #e1e2e4;
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;
  margin-top: 165px;
}
.link {
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.08px;
  color: inherit;
}
@media only screen and (max-width: 650px) {
  footer {
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
