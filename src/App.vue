<template>
  <div>
    <div class="loading">loading</div>
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
            <div class="calendar_cell" v-for="day in count_month_days" v-bind:day="day" v-on:click="useDate(day)"> {{ day }}</div>
        </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'app',
  data () {
    return {
      current_date: new Date(),
      month: [
          [ 'Январь', 'Января' ],
          [ 'Февраль', 'Февраля' ],
          [ 'Март', 'Марта' ],
          [ 'Апрель', 'Апреля' ],
          [ 'Май', 'Мая' ],
          [ 'Июнь', 'Июня' ],
          [ 'Июль', 'Июля' ],
          [ 'Август', 'Августа' ],
          [ 'Сентябрь', 'Сентября' ],
          [ 'Октябрь', 'Октября' ],
          [ 'Ноябрь', 'Ноября' ],
          [ 'Декабрь', 'Декабря' ]
      ],
      date: null,
      times: [
        '00:00:00',
        '01:00:00',
        '02:00:00',
        '03:00:00',
        '04:00:00',
        '05:00:00',
        '06:00:00',
        '07:00:00',
        '08:00:00',
        '09:00:00',
        '10:00:00',
        '11:00:00',
        '12:00:00',
        '13:00:00',
        '14:00:00',
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00',
        '19:00:00',
        '20:00:00',
        '21:00:00',
        '22:00:00',
        '23:00:00',
      ],
      time: null,
      entry: [
        {
          
        }
      ],
      objects: [
        {
          id: 1,
          title: 'Зал White',
          price: 1200
        },
        {
          id: 2,
          title: 'Зал Black',
          price: 900
        },
        {
          id: 3,
          title: 'Зал Max',
          price: 900
        },
        {
          id: 4,
          title: 'Зал Wood',
          price: 900
        },
        {
          id: 5,
          title: 'Зал Red',
          price: 600
        },
      ],
      orderHour: [
        {
          title: "Один час",
          value: 1
        },
        {
          title: "Два часа",
          value: 2
        },
        {
          title: "Три часа",
          value: 3
        },
        {
          title: "Четыре часа",
          value: 4
        },
        {
          title: "Пять часов",
          value: 5
        },
      ],
      orderHoutSelect: 1,
      iPlaceID: null,
      iUserID: null,
    }
  },
  created: function () {
    var iPlaceID = (this.$route.query.iPlaceID) ? Number(this.$route.query.iPlaceID) : 1
    var iUserID = (this.$route.query.iUserID) ? Number(this.$route.query.iUserID) : null
    Vue.set(this, 'iPlaceID', iPlaceID)
    Vue.set(this, 'iUserID', iUserID)

    // console.log(this.$root)
  },
  methods: {
      useDate: function (day) {
          var useDate = new Date(this.current_date.getFullYear(), this.current_date.getMonth(), day)
          Vue.set(vm, 'date', useDate)
          Vue.set(vm, 'current_date', useDate)
          this.getEntry()
      },
      setTime: function (time) {
          Vue.set(vm, 'time', time)
          // $('#exampleModal').modal()
      },
      prevMonth: function () {
          let Y = this.current_date.getFullYear()
          let M = this.current_date.getMonth()
          let temp_date = new Date(Y, M, 1)
              temp_date.setMonth(temp_date.getMonth()-1)
          Vue.set(this, 'current_date', temp_date)
      },
      nextMonth: function () {
          let Y = this.current_date.getFullYear()
          let M = this.current_date.getMonth()
          let temp_date = new Date(Y, M, 1)
              temp_date.setMonth(temp_date.getMonth()+1)
          Vue.set(this, 'current_date', temp_date)
      },
      prevDay: function () {
          var newDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate())
              newDate.setDate(newDate.getDate()-1)
          Vue.set(vm, 'date', newDate)
          Vue.set(vm, 'current_date', newDate)
          this.getEntry()
      },
      nextDay: function () {
          var newDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate())
              newDate.setDate(newDate.getDate()+1)
          Vue.set(vm, 'date', newDate)
          Vue.set(vm, 'current_date', newDate)
          this.getEntry()
      },
      clearDate: function () {
          Vue.set(vm, 'date', null)
          Vue.set(vm, 'time', null)
      },
      clearTime: function () {
          Vue.set(vm, 'time', null)
          this.getEntry()
      },
      getEntry: function () {
          if (vm.date && vm.iPlaceID) {
              axios.post('/get', {
                  dEntryDate: new Date(vm.date).toYMD(),
                  iPlaceID: vm.iPlaceID
              })
              .then(function (response) {
                  // console.log(response.data)
                  Vue.set(vm, 'entry', response.data)
                  Vue.nextTick(function () {
                      $('.entry').each(function (i, v) {
                          var from = $(this).attr('data-from')
                          var to = $(this).attr('data-to')
                          console.log(from, to)
                          var top = $('.time[data-date="'+from+'"]').position().top
                          var top2 = $('.time[data-date="'+to+'"]').position().top
                          if (top2 === 0) { top2 = $('.times').height() }
                          console.log(top, top2)
                          // console.log(el)
                          $(this).css({top: top}).height(top2-top)
                      })
                  })
              })
              .catch(function (error) {
                  console.log(error)
              })    
          }
      },
      orderTime: function () {
          axios.post('/set', {
              iPlaceID: this.iPlaceID,
              dEntryDate: this.dateString,
              tEntryTimeFrom: this.time,
              orderHoutSelect: this.orderHoutSelect
          })
          .then(function (response) {
              vm.clearTime()
          })
          .catch(function (error) {
              console.log(error)
          })
      }
  },
  computed: {
    count_month_days: function () {
        let Y = this.current_date.getFullYear()
        let M = this.current_date.getMonth()
        return 32 - new Date(Y, M, 32).getDate()
    },
    year: function () {
      return this.current_date.getFullYear()
    },
    month_name: function () {
      let M = this.current_date.getMonth()
      return this.month[M][0]
    },
    currentDate: function () {
      return this.date.getDate() + ' ' + this.month[this.date.getMonth()][0] + ' ' + this.date.getFullYear()
    },
    dateString: function () {
      return new Date(vm.date).toYMD()
    }
  }
}
</script>

<style lang="scss">
body {
  // background: grey;
  overflow: hidden;
}
</style>

<style lang="scss">
.loading {
  text-align: center;
}
#calendar {
  
    background: white;
    display: flex;
  display: none;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 700px;
    height: 700px;
    margin: 0 auto;
    .calendar_header {
        background: #CCC;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        text-align: center;
        padding: 10px;
        .prev {
            flex-basis: 100px;
            flex-shrink: 0;
            padding: 10px;
        }
        .title {
            flex-grow: 1;
            // background: red;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            .selectMonth {

            }
            .name {
                font-size: 18px;
                font-weight: bold;
            }
        }
        .next {
            flex-basis: 100px;
            flex-shrink: 0;
            padding: 10px;
        }
    }
    .calendar_list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 700px;
        .calendar_cell {
            flex-basis: 100px;
            height: 100px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #DDDDDD;
            &:nth-child(2n) {
                background: #EEEEEE;
            }
            &:hover {
                background: #CCCCCC;
            }
        }
    }
}
</style>
