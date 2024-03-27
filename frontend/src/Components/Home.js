import React from "react";
import Create from "./CreateNote";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-4">
      <h1>Create a Note</h1>
      <h2 className="ms-3 mt-5">Select Testnet</h2>
      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <Link to="/create" state={{ from: "11155111" }} className="card">
            <img
              src="https://assets-global.website-files.com/6364e65656ab107e465325d2/637aee14aa9d9f521437ec16_hYC2y965v3QD7fEoVvutzGbJzVGLSOk6RZPwEQWcA_E.jpeg"
              className="card-img-top img-fluid"
              alt="Sepolia Logo"
              style={{ height: "200px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h5 className="card-title">ETH Sepolia</h5>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link to="/create" state={{ from: "534351" }} className="card">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAA8FBMVEX/7dwrISnl0bjXr5Xp1bv/8uD/8eDq1rwYCxqrnpX/792OgXzl0bm8qpchFSHWw60IAA7LuaTGtKFdUE5hVVNnTkKThnu7kGiZi4DImnCWcVWclJFTPTijg3CGZExcRDxPREXHoYqvoJDk1clxZF/FuK+1iWWUiYW3q6QmGyTz49UuJjF0bXESABTNqI2vj3trUD/AnIQAAADQw7tpXl6llYfq289FPUWCeXjczsNXUFUeEB6xpaA1LTYWAxiGeXCBZ1yUd2peRzxrXlpCMTAWESOhfFw/Ly92W0dYPzNLNCtPR0s+ND1qYmZwZ2lmWlbIBuObAAAMh0lEQVR4nO2cCVfiOhuAi0NCiRhxG3WqMypWmrJ4HbB0oSijMzqXZf7/v/maNoGytESv1ftd8pw5Z46lS/qQJm/epCiKRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSP4DQPAKIProYn8ACCh6dbO6Sf+9BM1RwEeX/d2Bxb370+vTA+9yS5zd3d2Lu3YLrFftQtC+b4bcfLss5EXZ2MjnC9uX1fWqW0Drf4pkNT/d3xU2XkTh81rZQtYerVSnAf1+H++8TFapcKevkS1YPG02+zkccHJw8OPhhVVrY9tdI1lgcN48/ZkLICfHx8eP2y+UVbhz1qeNB4/N5j2msnI/fx0e/t7Nv0xWfqu4PlWLyrrGP0O+Hh7+tfVSWdubaySrfRO079eUsy+vkLWxvUb9IdD7LHBokqsXysqvmyyE9m8iVw8/DqeySrsC0M4gv/P/JQsp1uI2tLhtOdDZO6eR1p+nwNUxk1U6OxDg5DYvKAuhaNiNEIQfOQBHoDLW4Pw2yxbupIDTOdk7e3w+jMna+X0swNVlQUgWgqiia5t117XtaldvWcGGDxGGkF4ra7PlRVDvlIsw4YgFgDXO/X7+EvD169+hrFJp70SAxwuRmoWgqbm5huphgrHn9Rqq71YtRbh4b0ZQhcY9os7KgkrdI6q4LJqjcXSjWDR03eYN/LYApbxAmwVMDauE5GIQ4jXqzrs3ddAgXi43KwvqPt32AlkK9QUBCNoT4+KlcdYKWdAZqMxUULGmznBOU973UTTHYUFmZdleuO1lshiQyxLN06ySBfQaYaJ8t14f5Ka+PNt8RQlfDTAa4WXjslDle7Ttn8na+izA7fYqWdCJqhXx7ZYZuDHN4kDlthrV92y3oKEukVV+A1nbT18EeL5b0Rsiaxi6wh0HQNoZBY+7Wfd409XT39EWl+V131rWzt+HV6v5sip0gHYohnQqsQIie2Kr8wGysPHWsjaO9ikPl4yH/Qj+92X010566IAqrOYb8V2Q2eHtVvkdqxY0vKxk5QsirGjgAa9Dc5sNXrVw+/06xAxlvUnowKrQ4tMWbCcEqzjXqbybLZBhzRKXNT/WmhbF6S1vmsC4QToju2i03jF4yExWaeNuT4D9XSorcRAK9CiyIcP5opiOZSrvPKLOrmYFvaEAv8LeMFEW1FhI5VnzVmgQ8Yri/RPeXhbQeZz1VYAfd6myQJU15Fh793HgktK8fc1isvI7t7e3F6nQHTbSH0Mui/gV8cLAAIWmvZZWvdh5lmV5giFu0pHZyRIcHK6Q1eUjGzwSe+oQBKaua9VxXTN0a/GmkdJl3SeApjW3LAUBYDo6xTGXNIdZyhLvDZPbLKfBZOVU2xQoDlRatosbKsbYa6iD6rwuYI2/G/Q8wCyOB51RN/YVIGh1bdf3Go2G6g/sojWvK7M2qxQ08QJs51NlIavGZeW8kbWy3YJOnSZxgggs+C/43/NnAnyEuj726MQbdAYepoHaePIZsDSfHkUJz1Crzl0wuwa+dPZNgMcwB5+cv4Y2ntjCHV1JDRWQotHcHMGdsaZp42FwKPHiMZxVVwMPLlRAy2fn7fHPkT4M0xu41ul0ajQNRNShMdOqvX0Ez2XtiuXgH1J7w0lUGrXyPdewAEAJ2Xek2I3QaTdahWhWaYOnGpO7gPVGGLOZ0KrxsSUZsgexWqabCK46waGOHSbNSMOOt5TZydqgOXhaedh/y+A5+JQLwaqai+nyhvuaE7TLYJmwEd0Vuya7FQRotSS+yXeF9bA6kRYYTRKIxAuHAHAcXobkorV1EOrRHt4oVrQMZQnl4LdX5eCRue/l4rowVmsjTTcXnsgogMWdaV2ADr3hxiT7xGR5Rec78VndwrXo2KgjKU9WPwEtqtLx9GKWsjbyq7rFPIvI0jKlyOzM2KLCiIr9tm7OHAVb5fCjeN4L0mE47szJwnYbD50wqUjwmA4NoO6x8fr0YMiyQGprsi1LWW+Ug0dsmmAO3Ot0ZybDXGrCm8kzQ7eHSa09Jysw2mgBoGGiunpUPwfRBRqxZXWAZfrIYHq67GTtHglwW1o9uxPEkf585YqeSNeZlDC6N1KbSdiAatWoTNMSXFYOj0HQdai1bhS68dCX+LERKOKdgDdRk5msklgO/q9VOfjonJZNvGW1qzYt9oiKoGHBzIEgHpROZYWPVpU9sUhxWfs1ipcDtNlWd3J8ZjVLLOuwMgfPihREjG5PxfPCiMeiDhZiYDvtTJPHcEj3QryHQBUWnuCZcgAe4jV4fcvwMTz68yfMvUdMUu98A93y8OdyR3AVDQpGbd1xh3h4Vlcvan9BN7yPnpFWZC5rTikwuKzujCw+Lu3xzRnKEptkFZm+5/cKgpFfcex78QpGhuH3zqpBI3XhM5c1txcY86dzZjtsMVm0hYu2ZBk6CA+kxddnQaBYrer+cNrgq2H/B6JmR0xWeXbBL+BTRXimd+ATSzly9g41a6O0mpfKCtdnBcORam4SgocTP2xio5E6McZlebNzHMDnsqzlsoZZyyptfN7bX83DinnDBBBsTWz1WjDo56Mb9hKnPsKbZbJqc7JyS2UpJuay2Ek/ujf8JbiYbcllJjOHwdFc1qR5WUqSLPLhsoRy8IJx1tLr8J49kjVk45W0Q5Jk+SvarOlj+NbT95M2a+f26DbgiGXbpxzR1Dz/UCCCp3HDYo4BOvHoiM/nk1bKqZJkDbksZ1UDn5msNxobIggVp2svpmS4n3BNC+sNc95mSpmTZI1WhA7tzGS9JgefKAsFkYJuD2q98mJMwJOoDXrr/KEkJGU2P0kWn5ycC0r5eorJcqwsZf3zfBZytHEtHOSQ/YVpeuaH+OEfOr/hUXItTZCF+KyINzvc2WQVrlyZDHcyW3J0JrJa+Sl1HTwolnm0ri7MsppRXkUND0YmTxSrcydDseTdcln8TAsDaVZZO/x7yk7W26yDH05GNvNr/NgyCEKiNM00/VzWlGl/AGFluu40SRbQ2ANXW5qimXxN2ckqnX37EZD4bsWPkMf0NyxAcTJvSLxifPIAONG99NixPNKi9+K2wiR9EOorjj19ihJlIZMd24sn/7psAc9wKju7xzCcN0xrrqbzhinrs1w8tVWvwKhEwaPVZVHoJLDiN0c3krGmW5ZjVMc1TKYjwSRZCuTZv3hamVXq+OxQhrJoin0aICzrBtknKbJgxZ+mGHCt6pgQItMxXMyWME9eHEBKfTq6xpj4Pn0RmcSHzYmyELQjDY0uf4J5nVbt+IRFZrIKwUCaLZVcEUsEshJ/3AE6w2kGi3jeoG23B7jHElN+LAZFijs7D5Rjdzs9V5Ks4EFkxxKdrilRIDKiXdV46jUzWYXdu7POWTCWDtesnaXSGVS7FZBwMWCNG/H8FcF8KEcao0q8SiLFLi/knntTVymyAlv18CrEs3UTmrodzpEQ1TZju2a2pvSO3F/f3DzgfvNcgJvTg3bSmzhI0QfeQgaeEHXYnXvVCUF92ItnUolaM+JFS5YVXKVYi6bv8XAwxGFCX/W7M5OTGdWswt1j9L7mtX/6SYzzk8RcFP2hmyHGfNUGXfWB8ai7uKoGQbPreh7mdLSZpR2wrhL6XtnyKB+Y2tALl5NEF/GG2twVoNEIP1JnZH0PtzVeL2uXBK7Ob+i70+Rc0Nank+SRCoBmpbvZbrcHw+Gw47br3UrCC3RAqRTtdtvdb9e1oDeYDdU1l+bQ3NHyt04D1fq43aHrdvxO226Z8w0pbLn7LiX2tSJrEG5yU7P/SVBZhcv7ZvP+KeefPT7m7kVlnY/TrofoL0gFzioVa26Ga9mO87NgrGyrCh8cWWnput6y4LI2FPIVN6vOIwo0tvL52k3z/iet0F+urnLCVevAXF0KhJIW0czu9srPwqWDab/rtXh9JFikZUBjN79BzptPYXfy7fj4QLTV+tRfpx+lCQlfzsTnzfuwOX46Pnzui8o6NdZNFnI+Fwr+ddC0B5yeSFnp7BcKdwfRr2k9PB8en1yLP4bv/4r4BwPs3fx27ZTK6vtXh1d+U1TW3ru+xPuvAJl7+cIW6Z/2955+BRVL+Cm8XqPf75kAjYd8YZeUn56vrq6ez0Rd3XTWr2IpNIm5t1UoHT3sndV+CrvquwJR1n8RaNkPny8uLj6rj6di9P8UP+bnUv4FIDrX1y1qQhgBrTX8cdcYdNgg9BPCEIRvcUkkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolE8rH8DxAkNQEhLZqtAAAAAElFTkSuQmCC"
              className="card-img-top img-fluid"
              alt="Scroll Sepolia Logo"
              style={{ height: "200px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h5 className="card-title">Scroll Sepolia</h5>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link to="/create" state={{ from: "421614" }} className="card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyf8QFVcs6HyHMkjEqdBFxw2BWCSsg6rZVVg&usqp=CAU"
              className="card-img-top img-fluid"
              alt="Arbitrium Sepolia Logo"
              style={{ height: "200px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h5 className="card-title">Arbitrium Sepolia</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
