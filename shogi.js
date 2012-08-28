/**
	@license Copyright (c) 2012, Christopher Ramey | http://github.com/cramey/shogi/LICENSE"
*/
var Shogi = {
	KING : 0,
	ROOK : 1,
	BISHOP : 2,
	GOLD_GENERAL : 3,
	SILVER_GENERAL : 4,
	KNIGHT : 5,
	LANCE : 6,
	PAWN : 7,
	PROMOTED_ROOK : 9,
	PROMOTED_BISHOP : 10,
	PROMOTED_SILVER : 12,
	PROMOTED_KNIGHT : 13,
	PROMOTED_LANCE : 14,
	PROMOTED_PAWN : 15,

	desc_king : [
		'reigning', 'challenging'
	],

	desc_peice : [
		'King', 'Rook', 'Bishop', 'Gold General',
		'Silver General', 'Knight', 'Lance', 'Pawn'
	],

	peicePromoted : function(n)
	{
		return (n & 8) != 0;
	},

	peiceCanPromote : function(b, l){
		var peice = b[l];
		if(peice == -1){ return false; }

		var pe = peice & 15;
		if(pe < 1 || pe > 7){ return false; }

		var player = this.peicePlayer(peice);
		if(player == 0 && l > 26){ return false; }

		if(player == 1 && l < 54){ return false; }

		return true;
	},

	peicePlayer : function(n)
	{
		return (n & 16) >> 4;
	},

	peiceName : function(n)
	{
		return this.desc_peice[n & 7];
	},

	peiceMoves : function(b, l)
	{
		var peice = b[l];
		var player = this.peicePlayer(peice);

		var moves = [];

		switch(peice & 15){
			case this.KING:
				var i = l + 9;
				if(i <= 80 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 9;
				if(i >= 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 1;
				if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 1;
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 8;
				if(i <= 80 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 10;
				if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 10;
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 8;
				if(i >= 0 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}
			break;


			case this.GOLD_GENERAL:
			case this.PROMOTED_SILVER:
			case this.PROMOTED_PAWN:
			case this.PROMOTED_LANCE:
			case this.PROMOTED_KNIGHT:
				var i = l + 9;
				if(i <= 80 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 9;
				if(i >= 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 1;
				if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 1;
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				if(player){
					i = l + 8;
					if(i <= 80 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
						moves.push(i);
					}

					i = l + 10;
					if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
						moves.push(i);
					}
				} else {
					i = l - 10;
					if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
						moves.push(i);
					}

					i = l - 8;
					if(i >= 0 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
						moves.push(i);
					}
				}
			break;


			case this.KNIGHT:
				var i = l + (player ? 19 : -19);
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + (player ? 17 : -17);
				if(i >= 0 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}
			break;


			case this.LANCE:
				if(player){
					for(var i = l + 9; i <= 80; i += 9){
						if(b[i] == -1){ moves.push(i); }
						else if(this.peicePlayer(b[i]) != player){
							moves.push(i); break;
						} else { break; }
					}
				} else {
					for(var i = l - 9; i >= 0; i -= 9){
						if(b[i] == -1){ moves.push(i); }
						else if(this.peicePlayer(b[i]) != player){
							moves.push(i); break;
						} else { break; }
					}

				}
			break;


			case this.PROMOTED_ROOK:
				var i = l - 10;
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 8;
				if(i >= 0 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 8;
				if(i <= 80 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 10;
				if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}
			case this.ROOK:
				for(var i = l - 9; i >= 0; i -= 9){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}

				for(var i = l - 1; i % 9 != 8; i--){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}

				for(var i = l + 1; i % 9 != 0; i++){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}

				for(var i = l + 9; i <= 80; i += 9){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}
			break;


			case this.PROMOTED_BISHOP:
				var i = l + 9;
				if(i <= 80 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 9;
				if(i >= 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 1;
				if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 1;
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}
			case this.BISHOP:
				for(var i = l - 8; i >= 0 && i % 9 != 0; i -= 8){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}

				for(var i = l - 10; i >= 0 && i % 9 != 8; i -= 10){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}

				for(var i = l + 8; i <= 80 && i % 9 != 8; i += 8){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}

				for(var i = l + 10; i <= 80 && i % 9 != 0; i += 10){
					if(b[i] == -1){ moves.push(i); }
					else if(this.peicePlayer(b[i]) != player){
						moves.push(i); break;
					} else { break; }
				}
			break;


			case this.PAWN:
				var i = l + (player ? 9 : -9);
				if(i >= 0 && i <= 80 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}
			break;


			case this.SILVER_GENERAL:
				i = l + (player ? 9 : -9);
				if(i >= 0 && i <= 80 && (b[i] == -1 || this.peicePlayer(b[i]))){
					moves.push(i);
				}

				var i = l - 10;
				if(i >= 0 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l - 8;
				if(i >= 0 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 8;
				if(i <= 80 && i % 9 != 8 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}

				i = l + 10;
				if(i <= 80 && i % 9 != 0 && (b[i] == -1 || this.peicePlayer(b[i]) != player)){
					moves.push(i);
				}
			break;
		}

		return moves;
	},

	peiceDescription : function(n)
	{
		var pl = (n & 16) >> 4;
		var pe = n & 7;

		return (this.peicePromoted(n) ? 'Promoted ' : '') +
			this.peiceName(n) +
			(pe == this.KING ? ' (' + this.desc_king[pl] + ')' : '');
	},

	boardStandard: function()
	{
		return [
			22,21,20,19,16,19,20,21,22,
			-1,18,-1,-1,-1,-1,-1,17,-1,
			23,23,23,23,23,23,23,23,23,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,
			 7, 7, 7, 7, 7, 7, 7, 7, 7,
			-1, 1,-1,-1,-1,-1,-1, 2,-1,
			 6, 5, 4, 3, 0, 3, 4, 5, 6
		];
	}
};
