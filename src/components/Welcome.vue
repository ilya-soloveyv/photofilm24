<template>
    <div id="calendar">
        <h1>{{ this.$parent.title }}</h1>
    </div>
</template>

<script>
export default {
    data: function () {
        return {

        }
    }
}
</script>

<style lang="scss">
#calendar {
    background: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 700px;
    height: 700px;
    margin: 0 auto;
}
</style>
