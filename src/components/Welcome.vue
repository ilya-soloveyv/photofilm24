<template>
    <div id="calendar">
        <div class="calendar_header">
            <div class="prev">
                <button class="btn btn-primary btn-block" v-on:click="prevMonth()">Назад</button>
            </div>
            <div class="title">
                <div class="selectMouth">
                    <select>
                        <option value="">111</option>
                    </select>
                </div>
                <div class="name">месяц год</div>
            </div>
            <div class="next">
                <button class="btn btn-primary btn-block" v-on:click="nextMonth()">Вперед</button>
            </div>
        </div>
        <div class="calendar_list" v-if="this.$parent.date == null">
            <div class="calendar_cell" v-for="day in calendarCountDayInMonth" v-bind:day="day" v-on:click="useDate(day)"> {{ day }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            calendarCountDayInMonth: 10
        }
    },
    props: [
        'current_date'
    ],
    created: function () {
        console.log(this.current_date)
    },
    methods: {
    }
}
</script>

