import React, { useEffect } from "react";
import styled from "styled-components";

import { FestLayout } from "../components/Layout";
import { useAppContext } from "../context";

const Pre = styled.pre`
  white-space: pre-wrap;
  font-family: Arial;
  font-size: 14px;
  margin-bottom: 50px;
`;

export default function Policy(props) {
  const ctx = useAppContext();

  return (
    <FestLayout className={props.className}>
      <Pre>
        {`From the moment the event starts, the buyer and the organizer understand and agree with each other that the event will take place fully, and a ticket return cannot be a subject of discussion.
Upon cancellation of the event by the event organizer, the organizer may, in its sole discretion, choose either fully or partially refund the buyer, refuse to reimburse or postpone the event. Upon cancellation of a full event, including but not limited to reasons under the control of the organizer, but state actions, riots, strikes, natural disasters, weather conditions (regardless of severity), or inaccessibility of the venue, the organizer has a full right to choose the mentioned below return policy:
1. Fully or partially reimburse the buyer
2. Postpone the event
The buyer's inability to enter the venue, based on a violation of legal or other regulations, is not subject to compensation.
Emergencies, cancellation and evacuation of partial or complete measures, natural disasters do not give the buyer the right to demand a refund.
If the organizer of the event decides to reimburse the amount, which is his sole decision, it will be in the amount of the ticket amount, not more.
If the event organizer decides to postpone the event, the buyer has no right to demand compensation.
 


1. In terms of our operation, we collect your personal data  which allow us to identify directly the personality thereof.
2. We may process (including: collection/ fixation/ input or systematization/ organization or preserving, use, change/ correction, recovery, transfer, blocking or destruction or other actions) the personal data to:
● Confirm or cancel your bid as a buyer;
● provide customers with information about the festival;
● contact and interact with the customers (e.g. responding their requests, providing important notices and updates, such as changes to these Terms and security alerts, etc.);
3. Your personal data will be saved up until the end of the festival, September 28, 2021, then they will be removed from our database.


Միջոցառումը սկսվելու պահից սկսած, գնորդը և կազմակերպիչը հասկանում և համաձայնության են գալիս, որ միջոցառումը ամբողջությամբ տեղի է ունենալու, և տոմսի վերադարձը քննարկման առարկա չի կարող լինել։ 
Միջոցառման կազմակերպչի կողմից, միջոցառման չեղարկումից հետո, կազմակերպիչը, իր բացարձակ հայեցողությամբ, կարող է ընտրել՝ գնորդին կա՛մ ամբողջությամբ, կա՛մ մասնակիորեն վերադարձնել գումարը, չտրամադրել փոխհատուցում կամ հետաձգել միջոցառումը: Ամբողջական միջոցառման չեղարկումից հետո, ներառյալ, բայց չսահմանափակվելով միայն կազմակերպչի վերահսկողության տակ գտնվող պատճառներով, այլ պետական գործողություններով, անկարգություններով, գործադուլներով, բնական աղետներով, եղանակային պայմաններով (անկախ ծանրությունից), կամ վայրի անհասանելիությունից, կազմակերպիչը ամբողջական իրավունք ունի ընտրելու վերադարձի քաղաքականության հետևյալ կետերը․
1․ Գնորդին լրիվ կամ մասնակի վերադարձնել գումարը
2․ Հետաձգել միջոցառումը 
Գնորդի անկարողությունը մուտք գործել միջոցառման վայր՝ հիմնված իրավական կամ այլ օրենսգրքի կանոնակարգերի խախտմամբ, չի ենթարկվում փոխհատուցման։ Արտակարգ իրավիճակները, մասնակի կամ ամբողջական միջոցառումների չեղարկումն ու տարհանումը, բնական աղետները, գնորդին իրավունք չեն տալիս հետ պահանջել գումարը։ 
Եթե միջոցառման կազմակերպիչը որոշում է փոխհատուցել գումարը, որը միայն և միայն իր որոշումն է, այն լինելու է տոմսի գումարի չափով, և ոչ ավել։ 
Եթե միջոցառման կազմակերպիչը որոշում է հետաձգել միջոցառումը, գնորդը ոչ մի իրավունք չունի պահանջելու փոխհատուցում։    
1. Մեր գործունեության շրջանակում մենք հավաքում ենք ձեր անձնական տվյալները, որոնք թույլ են տալիս ուղղակիորեն նույնականացնել ձեր ինքնությունը:                                             2. Մենք կարող ենք իրականացնել անձնական տվյալների մշակում (այդ թվում՝ հավաքագրում/ ամրագրում/ մուտք կամ համակարգում/ կազմակերպում կամ պահպանություն, օգտագործում, փոփոխություն/ ուղղում, վերականգնում, փոխանցում, արգելափակում կամ ոչնչացում կամ այլ գործողություններ) հետևյալ նպատակներով.
Հաստատել կամ չեղարկել ձեր հայտը որպես գնորդ․
տրամադրել տեղեկատվություն միջոցառման մասին
հաղորդակցվել և համագործակցել, այդ թվում՝ արձագանքել հարցումներին, տրամադրել ծանուցումներ և թարմացումներ, անվտանգության ահազանգեր և այլն.
3․ Ձեր անձնական տվյալները կպահպանվեն մինչև փառատոնի ավարտը՝ 2021թ․-ի սեպտեմբերի 28-ը, այնուհետև դուրս կգան մեր համակարգից։
`}
      </Pre>
    </FestLayout>
  );
}
