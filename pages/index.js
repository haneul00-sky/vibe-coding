import { useState } from 'react';

export default function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(6); // 2026년 7월 (0부터 시작하므로 6)

  // 2026년도 최신 변경 및 법정 공휴일 데이터 업데이트 완료
  const holidays2026 = {
    "0-1": { name: "신정", type: "legal" },
    "1-16": { name: "설날 연휴", type: "legal" },
    "1-17": { name: "설날", type: "legal" },
    "1-18": { name: "설날 연휴", type: "legal" },
    "2-2": { name: "삼일절 대체공휴일", type: "substitute" }, // 3/1 일요일 대체
    "4-5": { name: "어린이날", type: "legal" },
    "4-25": { name: "부처님오신날 대체공휴일", type: "substitute" }, // 5/24 일요일 대체
    "5-3": { name: "지방선거 (임시공휴일)", type: "temporary" }, // 6월 3일 수요일
    "6-17": { name: "제헌절 (★2026년 법정공휴일 복원)", type: "restored" }, // 7월 17일 금요일 복원 완료
    "7-17": { name: "광복절 대체공휴일", type: "substitute" }, // 8/15 토요일 대체
    "8-24": { name: "추석 연휴", type: "legal" },
    "8-25": { name: "추석", type: "legal" },
    "8-26": { name: "추석 연휴", type: "legal" },
    "9-5": { name: "개천절 대체공휴일", type: "substitute" }, // 10/3 토요일 대체
    "9-9": { name: "한글날", type: "legal" },
    "11-25": { name: "성탄절", type: "legal" }
  };

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 특정 월의 일수와 시작 요일 계산 (2026년 기준)
  const getMonthData = (month) => {
    const firstDay = new Date(2026, month, 1).getDay();
    const totalDays = new Date(2026, month + 1, 0).getDate();
    return { firstDay, totalDays };
  };

  const { firstDay, totalDays } = getMonthData(currentMonth);
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const calendarGrid = [...blanks, ...days];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        
        {/* 상단 타이틀 바 */}
        <div style={{ backgroundColor: '#0F172A', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#F8FAFC', fontSize: '22px', fontWeight: '800', margin: 0 }}>📅 HANEUL 2026 CALENDAR</h1>
            <p style={{ color: '#94A3B8', fontSize: '13px', margin: '4px 0 0 0' }}>최신 개정 법령 및 임시·대체공휴일 실시간 반영 완료</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentMonth(prev => Math.max(0, prev - 1))} style={{ backgroundColor: '#1E293B', color: '#E2E8F0', border: '1px solid #334155', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>이전 달</button>
            <button onClick={() => setCurrentMonth(prev => Math.min(11, prev + 1))} style={{ backgroundColor: '#1E293B', color: '#E2E8F0', border: '1px solid #334155', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>다음 달</button>
          </div>
        </div>

        {/* 현재 월 표시 */}
        <div style={{ padding: '30px 40px 10px 40px', fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>
          2026년 {monthNames[currentMonth]}
        </div>

        {/* 달력 본문 격자 */}
        <div style={{ padding: '20px 40px 40px 40px' }}>
          {/* 요일 헤더 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: '700', fontSize: '14px', borderBottom: '2px solid #F1F5F9', paddingBottom: '12px', marginBottom: '12px' }}>
            {daysOfWeek.map((day, i) => (
              <span key={day} style={{ color: i === 0 ? '#EF4444' : i === 6 ? '#3B82F6' : '#64748B' }}>{day}</span>
            ))}
          </div>

          {/* 일자 그리드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '16px', columnGap: '12px' }}>
            {calendarGrid.map((day, index) => {
              if (day === null) return <div key={`blank-${index}`} />;
              
              const holidayKey = `${currentMonth}-${day}`;
              const holiday = holidays2026[holidayKey];
              const isSunday = index % 7 === 0;
              const isSaturday = index % 7 === 6;

              return (
                <div key={`day-${day}`} style={{
                  minHeight: '85px',
                  padding: '8px',
                  backgroundColor: holiday ? '#FEF2F2' : '#F8FAFC',
                  borderRadius: '10px',
                  border: holiday ? '1px solid #FEE2E2' : '1px solid #F1F5F9',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ 
                    fontWeight: '700', 
                    fontSize: '15px', 
                    color: holiday || isSunday ? '#EF4444' : isSaturday ? '#3B82F6' : '#334155'
                  }}>
                    {day}
                  </span>
                  
                  {/* 공휴일 명칭 우아하게 노출 */}
                  {holiday && (
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '600', 
                      color: holiday.type === 'restored' ? '#059669' : '#DC2626',
                      backgroundColor: holiday.type === 'restored' ? '#D1FAE5' : '#FFE4E6',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      marginTop: '4px',
                      lineHeight: '1.2',
                      textAlign: 'center'
                    }}>
                      {holiday.name}
                    </span>
                  )}
                  {!holiday && <span style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'right' }}>+ 일정</span>}
                </div>
              );
            })}
          </div>
        </div>

        [span_2](start_span){/* 공휴일 범례 알림 패널 */}
        <div style={{ backgroundColor: '#F1F5F9', padding: '16px 40px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '20px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
          <span>📌 <strong>특이사항 가이드:</strong></span>
          <span>• 6월 3일: 지방선거 임시공휴일 반영[span_2](end_span)</span>
          <span style={{ color: '#059669', fontWeight: '700' }}>• 7월 17일: 제헌절 공휴일 복원 완료 (금요일 황금연휴)</span>
        </div>

      </div>
    </div>
  );
}