import React from "react";

import "../css/Barber.css";
import { useState } from "react";
import {
  isToday,
  getDay,
  eachDayOfInterval,
  format,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import Logo from "../css/Logoss.png";
import Obraz1 from "../css/Obraz1.png";
import Obraz2 from "../css/Obraz2.png";
import Obraz3 from "../css/Obraz3.png";
import Obraz4 from "../css/Obraz4.png";
import Obraz5 from "../css/Obaz5.png";
// import Obraz6 from "../css/Obraz6.png";
import Obraz7 from "../css/Obraz7.png";
import face from "../css/Sokoł.png";
import x from "../css/x.png";

export default function Welcome() {
  const [visible, setVisible] = useState(false);
  const [service, setService] = useState("");
  const [chairdress, setChairdress] = useState("Matt");
  const [choseDay, setDay] = useState("");
  const [nick, setNick] = useState("");
  const curentMonth = new Date();
  const [chosehour, setHour] = useState({
    activeObject: null,
    objects: [
      ["9.00"],
      ["10.00"],
      ["11.00"],
      ["12.00"],
      ["13.00"],
      ["14.00"],
      ["15.00"],
      ["16.00"],
      ["17.00"],
    ],
  });
  const array = [];
  const enterNick = (val) => {
    if (val) {
      setNick(val.target.value);
      console.log(nick);
    }
  };

  const handleSelectDresser = (event) => {
    setChairdress(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectService = (e) => {
    setService(e.target.value);
  };

  const pastDays = (index) => {
    const check = curentMonth.getDate();

    if (check > index + 1) {
      return "pastDay";
    }
  };
  const checkAppoitment = (index) => {
    setVisible(true);
    setDay(index + 1);
    console.log(index);
  };
  const topMonth = () => {
    return (
      <div>
        <h2>{format(curentMonth, "MMMM yyyy")} </h2>
      </div>
    );
  };
  const hairdresser = ["Matt", "Karol", "Dawid", "Gerard"];
  const selectChairdress = () => {
    return hairdresser.map((chairdresser) => {
      return <option value={chairdresser}>{chairdresser}</option>;
    });
  };

  const services = [
    "HAIRCUT",
    "HOT TOWEL SHAVE",
    "COMBO",
    "BEARD TRIMMING",
    "BALD MAN WITH BEARD",
    "LONGHAIRCUT",
    "WASHING & STYLING",
  ];

  const selectService = () => {
    return services.map((map) => {
      return <option value={map}>{map}</option>;
    });
  };
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysOfWeek = () => {
    return weekDays.map((days) => {
      return (
        <div key={days} className='days'>
          {days}
        </div>
      );
    });
  };

  const firstDayOfMonth = startOfMonth(curentMonth);
  const lastDayofMonth = endOfMonth(curentMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayofMonth,
  });
  const firstDayNo = getDay(firstDayOfMonth);
  const calendarDays = () => {
    return daysInMonth.map((dayNo, index) => {
      return (
        <div
          className={`dayNo ${isToday(dayNo) && "today"}  ${pastDays(index)}`}
          kay={index}
          onClick={() => checkAppoitment(index)}
        >
          {format(dayNo, "d")}
        </div>
      );
    });
  };
  const active = (h) => {
    if (chosehour.objects[h] === chosehour.activeObject) {
      return "active";
    } else {
      return "inactive";
    }
  };
  const mapHours = () => {
    return chosehour.objects.map((hourse, h) => {
      return (
        <div
          kay={h}
          className={`h1l ${active(h)}`}
          onClick={() => {
            setHour({ ...chosehour, activeObject: chosehour.objects[h] });
            console.log(chosehour.activeObject);
          }}
        >
          {hourse}
        </div>
      );
    });
  };

  return (
    <div id='mine'>
      <div className='menu' id='menu'>
        <nav className='pole1' id='pole1'>
          <div>
            <a href='#me'>Our Story</a>
          </div>
          <div>
            <a href='#me'>Traditions</a>
          </div>
        </nav>

        <img id='logo' className='logo' src={Logo} alt='logo'></img>
        <nav className='pole2' id='pole2'>
          <div>
            <a href='#me'>About Me</a>
          </div>
          <div>
            <a href='#me'>Services</a>
          </div>
        </nav>
      </div>

      <div className='welcome' id='welcome'>
        <h1 className='h1'>Best Servie For You </h1>
        <p className='story' id='story'>
          Mat Barber is a well-known figure in Lublin, Poland, recognized for
          his skills and contributions to the local community as a barber. His
          barbershop has become a staple in the city, attracting clients from
          various backgrounds and providing high-quality grooming services.
        </p>
      </div>

      <div className='picturesDiv'>
        <div className='picturesBox1'>
          <img className='picturess1' alt='logo2' src={Obraz1}></img>
        </div>
        <div className='picturesBox2'>
          <img className='picturess1' alt='logo' src={Obraz2}></img>
        </div>

        <div className='picturesBox3'>
          <img className='picturess1' alt='logo' src={Obraz4}></img>
        </div>

        <div className='picturesBox5'>
          <img className='picturess1' alt='logo' src={Obraz5}></img>
        </div>
        <div className='picturesBox4'>
          <img className='picturess1' alt='logo' src={Obraz3}></img>
        </div>
        <div className='picturesBox6'>
          <img className='picturess1' alt='logo' src={Obraz7}></img>
        </div>

        {
          // <div className='picturesBox7'>
          //   <img className='picturess7' alt='logo' src={Obraz6}></img>
          // </div>
        }
      </div>
      <div id='me' className='face'>
        <h1 className='h1'>Just Me</h1>
        <img className='pickface' alt='logo' src={face}></img>
        <div className='text'>make an appointment</div>
        <h1 className='h1'>Matt</h1>
        <p className='matStory'>
          Mat Barber is a well-known figure in Lublin, Poland, recognized for
          his skills and contributions to the local community as a barber. His
          barbershop has become a staple in the city, attracting clients from
          various backgrounds and providing high-quality grooming services.
        </p>
      </div>

      <div className='calender'>
        <div className='calenderTitle'>{topMonth()}</div>

        <div className='days'>{daysOfWeek()}</div>

        <div className='days'>
          {Array.from({ length: firstDayNo - 1 }).map((_, index) => {
            return <div key={`empty-${index}`} />;
          })}
          {calendarDays()}
        </div>
        <div
          id='boxApoitment'
          className={`boxApoitment  `}
          style={{
            display: visible ? "block" : "none",
          }}
        >
          <div>
            <img
              className='x'
              src={x}
              onClick={() => {
                setVisible(false);
              }}
            ></img>
            <h2>
              {" "}
              {choseDay} {format(curentMonth, "MMMM yyyy")}{" "}
            </h2>
          </div>
          <div>
            <div className='terminal'>
              <h2>hours:</h2>
              <div className='hours'>{mapHours()}</div>
            </div>
            <div className='chooseServiceTab '>
              choose service<br></br>
              <select
                className='chooseTab '
                value={service}
                onChange={(e) => {
                  handleSelectService(e);
                }}
              >
                {selectService()}
              </select>
              <div className='choosePerson'>
                hairdresser:
                <br></br>
                <select
                  value={chairdress}
                  onChange={(event) => {
                    handleSelectDresser(event);
                  }}
                  className='chooseTab '
                >
                  {selectChairdress()}
                </select>
                <br></br>Please Enter Your Name and Surname<br></br>
                <input
                  value={nick}
                  className='input'
                  onChange={enterNick}
                ></input>
                <br></br>
                <button
                  type='submit'
                  onClick={() => {
                    array.push(
                      service,
                      chairdress,
                      nick,
                      chosehour.activeObject
                    );
                    console.log(array);
                  }}
                  className='submit'
                >
                  book an appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
