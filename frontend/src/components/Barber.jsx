import "../css/Barber.css";
import { useState, useEffect, React } from "react";
import {
  isToday,
  getDay,
  eachDayOfInterval,
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  addYears,
} from "date-fns";
import Logo from "../css/Logoss.png";
import x from "../css/x.png";
import Slider from "./slider.jsx";
export default function Welcome() {
  const hairdresser = ["Matt", "Karol", "Dawid", "Gerard"];
  const url = "http://localhost:3999/barber";
  const [visible, setVisible] = useState(false);
  const [visibleDone, setVisibleDone] = useState(false);
  const [service, setService] = useState("Haircut");
  const [chairdress, setChairdress] = useState(hairdresser[0]);
  const [dates, setDates] = useState([]);
  const [choseDay, setDay] = useState("");
  const [nick, setNick] = useState("");
  const [curentDat, setCurentDat] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nameAndHour, setNameAndHour] = useState(false);
  const [onlyHour, setOnlyHour] = useState(false);
  const [onlyName, setOnlyName] = useState(false);
  useEffect(() => {
    const curentDate = new Date();
    const fetchData = async () => {
      const data = await fetchGET();
      setDates(data);
    };
    setChairdress(hairdresser[currentIndex]);
    fetchData();
    setCurentDat(curentDate);
    console.log(curentDat);
  }, [currentIndex]);

  const [chosehour, setHour] = useState({
    activeObject: "",
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

  const enterNick = (val) => {
    if (val) {
      setNick(val.target.value);
    }
  };

  const handleSelectService = (e) => {
    setService(e.target.value);
  };

  const checkAppoitment = (index) => {
    setVisible(true);
    setDay(index + 1);
  };
  const topMonth = () => {
    const curentDats = format(curentDat, "MMMM");
    const curentyear = format(curentDat, "yyyy");
    return (
      <div>
        <h2>
          {curentDats} {curentyear}
        </h2>
      </div>
    );
  };

  const fetchPOST = (array) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(array),
      headers: { "Content-type": "application/json" },
    });
  };
  const fetchGET = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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
    return services.map((map, index) => {
      return (
        <option key={index} value={map}>
          {map}
        </option>
      );
    });
  };
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysOfWeek = () => {
    return weekDays.map((days) => {
      return (
        <div key={days} className='daysNameEle'>
          {days}
        </div>
      );
    });
  };

  const firstDayOfMonth = startOfMonth(curentDat);
  const lastDayofMonth = endOfMonth(curentDat);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayofMonth,
  });
  const firstDayNo = getDay(firstDayOfMonth);
  const calendarDays = () => {
    // Obliczanie pustych dni przed pierwszym dniem miesiąca
    const emptyDaysCount = firstDayNo === 0 ? 6 : firstDayNo - 1;

    return [
      //
      ...Array.from({ length: emptyDaysCount }).map((_, index) => (
        <div key={`empty-${index}`} className='empty-day' />
      )),
      // Dni miesiąca
      ...daysInMonth.map((dayNo, index) => {
        const isSunday = (index + emptyDaysCount) % 7 === 6;

        return (
          <div
            className={`dayNo ${checkingDay(dayNo)} ${
              isToday(dayNo) ? "today" : ""
            } ${isSunday ? "sunday" : ""}`}
            key={index}
            onClick={() => checkAppoitment(index)}
          >
            {format(dayNo, "d")}
          </div>
        );
      }),
    ];
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
          key={h}
          className={`h1l ${active(h)} ${hourAvaiable(hourse)}`}
          onClick={() => {
            setHour({ ...chosehour, activeObject: chosehour.objects[h] });
          }}
        >
          {hourse}
        </div>
      );
    });
  };

  const handleNextMont = () => {
    const newDateWithMonths = addMonths(curentDat, 1);
    setCurentDat(newDateWithMonths);
  };
  const prevNextMont = () => {
    const newDateWithMonths = addMonths(curentDat, -1);
    setCurentDat(newDateWithMonths);
  };
  const hourAvaiable = (h) => {
    const dataMonth = format(curentDat, "MM");
    const dataYear = format(curentDat, "yyyy");
    const dateYears = dates.filter(
      (res) =>
        res.person === chairdress &&
        res.date.year === dataYear &&
        res.date.month === dataMonth &&
        res.date.day === choseDay
    );

    const hourCheck = dateYears.find((bookdHour) =>
      h.includes(bookdHour.date.hour)
    );
    if (hourCheck) {
      return "blockedHour";
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hairdresser.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;

      return newIndex < 0 ? hairdresser.length - 1 : newIndex;
    });
  };
  const checkingDay = (one) => {
    const arrHours = [];

    const dayys = format(one, "d");

    const dataMonth = format(curentDat, "MM");
    const dataYear = format(curentDat, "yyyy");
    const dateYears = dates.filter(
      (res) =>
        res.person == chairdress &&
        res.date.year == dataYear &&
        res.date.month == dataMonth &&
        res.date.day == dayys
    );
    const pastDaycheck = new Date();
    const currentMonth = pastDaycheck.getMonth() + 1;
    const check = curentDat.getDate();
    const currentYear = pastDaycheck.getFullYear();
    if (dataYear == currentYear) {
      if (dataMonth < currentMonth) {
        return "pastDay";
      } else if (dataMonth == currentMonth) {
        {
          if (dayys < check) {
            return "pastDay";
          }
        }
      }
    } else if (dataYear < currentYear) {
      return "pastDay";
    } else {
    }
    if (dateYears.length !== 0) {
      const hourInDay = dateYears.map((res) => res.date.hour);
      arrHours.push(...hourInDay);
    }
    const arrs = [
      "9.00",
      "10.00",
      "11.00",
      "12.00",
      "13.00",
      "14.00",
      "15.00",
      "16.00",
      "17.00",
    ];
    const set = arrs.every((hour) => arrHours.includes(hour));
    return set ? "fullyBooked" : "available";
  };

  const dataMont = format(curentDat, "MM");
  const dataYear = format(curentDat, "yyyy");
  const subimitDates = (addEle, dateAdd, string) => {
    console.log(string);
    if (nick === "" && string === "") {
      setNameAndHour(true);
      console.log("obie");
    } else if (nick !== "" && string === "") {
      setOnlyHour(true);
      console.log("brak h");
    } else if (nick === "" && string !== "") {
      console.log("brak nikcu");
      setOnlyName(true);
    } else {
      console.log("ok");
      setDates(addEle);
      fetchPOST(dateAdd);

      setService("Haircut");
      setNick("");
      setVisibleDone(true);
    }
  };
  const string = chosehour.activeObject.toString();

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
          <p>
            Always focus on perfecting foundational techniques, such as precise
            scissor cuts, clipper work, and fading. Strong basics build the
            foundation for advanced skills.{" "}
          </p>
        </div>
        <div className='picturesBox2'>
          <p>
            Always focus on perfecting foundational techniques, such as precise
            scissor cuts, clipper work, and fading. Strong basics build the
            foundation for advanced skills.
          </p>
        </div>

        <div className='picturesBox3'>
          <p>
            Ensure tools, equipment, and the workspace are sanitized before and
            after each client. This not only ensures safety but also builds
            trust and professionalism.{" "}
          </p>
        </div>

        <div className='picturesBox5'>
          <p>
            Effective communication is key. Listen carefully to your clients'
            preferences and provide recommendations that suit their face shape,
            hair type, and lifestyle.{" "}
          </p>
        </div>
        <div className='picturesBox4'>
          <p>
            The barbering industry evolves constantly. Keep up with modern
            trends and techniques to meet client expectations and stay
            competitive.
          </p>
        </div>
        <div className='picturesBox6'></div>
      </div>
      <div id='me' className='face'>
        <h1 className='h1'>Our Team</h1>
        <Slider />
      </div>

      <div className='calender'>
        <div className='calendarTitleEle'>
          <div className='changeMont'>
            <button
              className='buttonArrowLeft'
              onClick={() => {
                prevNextMont();
              }}
            >
              {"<< "}
            </button>
            <div className='calenderTitle'>{topMonth()}</div>{" "}
            <button
              className='buttonArrowRight'
              onClick={() => {
                handleNextMont();
              }}
            >
              {">>"}
            </button>
          </div>
          <div className='chairdresserSwap'>
            <button
              className='buttonArrowLeft'
              onClick={() => {
                handlePrev();
              }}
            >
              {"<< "}
            </button>
            <div className='chosechairdresser'>{hairdresser[currentIndex]}</div>
            <button
              className='buttonArrowRight'
              onClick={() => {
                handleNext();
              }}
            >
              {">>"}
            </button>
          </div>
        </div>
        <div className='daysName'>{daysOfWeek()}</div>
        <div className='days'>{calendarDays()}</div>
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
              alt='x'
              onClick={() => {
                setOnlyName(false);
                setOnlyName(false);
                setNameAndHour(false);
                setVisible(false);
                setService("Haircut");
                setNick("");
              }}
            ></img>
            <h2>
              {" "}
              {choseDay} {format(curentDat, "MMMM yyyy")}{" "}
            </h2>
          </div>
          <div>
            <div className='terminal'>
              <p
                style={{
                  display: nameAndHour ? "block" : "none",
                }}
              >
                Please chose Hour hourn and eneter you Name
              </p>
              <p
                style={{
                  display: onlyHour ? "block" : "none",
                }}
              >
                Please chose Hour
              </p>
              <p
                style={{
                  display: onlyName ? "block" : "none",
                }}
              >
                Please eneter you Name
              </p>
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
                    const string = chosehour.activeObject.toString();

                    const dataMont = format(curentDat, "MM");
                    const dataYear = format(curentDat, "yyyy");
                    const dateAdd = {
                      service: service,
                      person: chairdress,
                      nick: nick,
                      date: {
                        hour: string,
                        month: dataMont,
                        day: choseDay,
                        year: dataYear,
                      },
                    };

                    const addEle = [...dates, dateAdd];
                    subimitDates(addEle, dateAdd, string);
                  }}
                  className='submit'
                >
                  book an appointment
                </button>
                <div
                  style={{
                    display: visibleDone ? "block" : "none",
                  }}
                  className='doneApoitment'
                >
                  <img
                    className='x2'
                    src={x}
                    alt='x'
                    onClick={() => {
                      setVisible(false);
                      setVisibleDone(false);
                    }}
                  ></img>
                  <p>
                    Thank you for choosing us Your visit will take place on:
                    {dataYear}.{dataMont}.{choseDay} o godzinie {string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
