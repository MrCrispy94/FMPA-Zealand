import React, { useMemo } from 'react';
import { Player, Club, CustomTag } from '../types';
import { SilhouetteIcon } from './icons/SilhouetteIcon';
import Kit from './Kit';

interface HallOfSaintsViewProps {
  allPlayers: Player[];
  allClubs: Record<string, Club>;
  customTags: CustomTag[];
  kitDisplayIndices: Record<string, number>;
  onKitClick: (playerId: string) => void;
}

const HallOfSaintsView: React.FC<HallOfSaintsViewProps> = ({ allPlayers, allClubs, customTags, kitDisplayIndices, onKitClick }) => {
  const saints = useMemo(() => {
    const saintsTag = customTags.find(tag => tag.name.toLowerCase() === 'hall of saints');
    if (!saintsTag) return [];
    return allPlayers.filter(player => player.customTags?.includes(saintsTag.id));
  }, [allPlayers, customTags]);

  return (
    <div className="h-full overflow-y-auto p-4" style={{
      background: 'radial-gradient(ellipse at center, #4a3a2a 0%, #1c1610 100%)',
    }}>
      <div className="text-center mb-8" style={{ fontFamily: "'Uncial Antiqua', cursive" }}>
        <h1 className="text-5xl font-extrabold" style={{
          color: '#fde047',
          textShadow: '0 0 5px #fde047, 0 0 10px #fde047, 0 0 15px #fde047, 0 0 20px #ff8d00, 0 0 35px #ff8d00, 0 0 40px #ff8d00, 0 0 50px #ff8d00',
        }}>
          HALL OF SAINTS
        </h1>
        <p className="text-lg text-yellow-200/70 mt-2">The legends who defined eras.</p>
      </div>

      {saints.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {saints.map(saint => {
            const kitDisplayIndex = kitDisplayIndices[saint.id] || 0;
            const gkKitIndex = saint.primaryPosition === 'GK' ? kitDisplayIndex : 0;
            const clubsPlayedFor = [saint.currentClub, ...saint.clubHistory.map(h => h.clubName)].filter(Boolean);
            const displayedClubName = saint.primaryPosition === 'GK' 
              ? saint.currentClub 
              : (clubsPlayedFor[kitDisplayIndex % (clubsPlayedFor.length || 1)] || saint.currentClub);
            const displayedClub = allClubs[displayedClubName];

            return (
              <div key={saint.id} className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-black/30 flex items-center justify-center overflow-hidden border-4 border-yellow-400 shadow-lg relative transition-all duration-300 group-hover:shadow-yellow-400/50">
                    {saint.imageUrl ? (
                      <img src={saint.imageUrl} alt={saint.lastName} className="w-full h-full object-cover" />
                    ) : (
                      <SilhouetteIcon className="w-24 h-24 text-gray-600" />
                    )}
                  </div>
                   {/* Halo */}
                   <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-8">
                      <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="50" cy="15" rx="45" ry="10" 
                          fill="none" 
                          stroke="rgba(253, 224, 71, 0.7)" 
                          strokeWidth="4" 
                          className="transition-all duration-500 opacity-0 group-hover:opacity-100"
                          style={{ filter: 'blur(2px)' }}
                        />
                      </svg>
                   </div>
                </div>
                
                <h2 className="text-2xl font-bold text-yellow-200 text-center tracking-wider" style={{ fontFamily: "'Uncial Antiqua', cursive" }}>{saint.knownAs || `${saint.firstName} ${saint.lastName}`}</h2>

                <div onClick={(e) => { e.stopPropagation(); onKitClick(saint.id); }} className="cursor-pointer flex flex-col items-center">
                  <Kit 
                    player={saint}
                    club={displayedClub}
                    allClubs={allClubs}
                    size="lg"
                    squadNumber={saint.squadNumber}
                    gkKitIndex={gkKitIndex}
                  />
                  <p className="text-center text-sm text-yellow-300/70 mt-1">{displayedClubName}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-yellow-200/50" style={{ fontFamily: "'Uncial Antiqua', cursive" }}>No players have been canonized yet.</p>
        </div>
      )}
    </div>
  );
};

export default HallOfSaintsView;